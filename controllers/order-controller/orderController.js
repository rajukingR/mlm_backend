const { Order, OrderItem, Product, User } = require('../../models');

// Create Order
exports.createOrder = async (req, res) => {
  const { user_id, items, coupon_code } = req.body; // coupon_code is optional

  try {
    // Check if user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate items input
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items must be a non-empty array' });
    }

    // Determine user role
    const userRole = user.role_name; // Assuming role_name is how you identify user roles

    // Initialize total amount and an array for order items
    let totalAmount = 0;
    const orderItems = [];

    // Retrieve products in bulk
    const productIds = items.map(item => item.product_id);
    const products = await Product.findAll({ where: { id: productIds } });
    const productMap = new Map(products.map(product => [product.id, product]));

    // Calculate total amount and prepare order items
    for (let item of items) {
      const product = productMap.get(item.product_id);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product_id} not found` });
      }
      totalAmount += product.price * item.quantity;

      orderItems.push({
        product_id: product.id,
        quantity: item.quantity,
        quantity_type: product.quantity_type,
        baseprice: product.price,
        final_price: product.price * item.quantity,
      });
    }

    // Final amount is the same as total amount
    const finalAmount = totalAmount;

    // Logic to determine the higher role ID based on user role
    let higherRoleId = null;

    // Implementing higher role logic
    higherRoleId = await getSuperior(user.id, userRole);

    // Create order
    const order = await Order.create({
      user_id,
      total_amount: totalAmount,
      coupon_code: coupon_code || null, // Allow NULL
      discount_applied: null, // Set discount applied as NULL for now
      final_amount: finalAmount,
      status: 'Pending', // Default status is 'Pending'
      requested_by_role: userRole, // Track who made the request
      higher_role_id: higherRoleId, // Next superior role ID
    });

    // Bulk create order items
    await OrderItem.bulkCreate(orderItems.map(item => ({
      ...item,
      order_id: order.id
    })));

    return res.status(201).json({ message: 'Order created successfully', order });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Implement this function to find the superior based on role
const getSuperior = async (userId, userRole) => {
  // Find the user to get the superior IDs
  const user = await User.findByPk(userId);
  if (!user) {
    return null; // User not found, return null
  }

  switch (userRole) {
    case 'Customer': // Assuming Customers are under Distributors
      return user.superior_d || await getSuperior(user.superior_d, 'Distributor');
    case 'Distributor':
      return user.superior_sd || await getSuperior(user.superior_sd, 'Super Distributor');
    case 'Super Distributor':
      return user.superior_md || await getSuperior(user.superior_md, 'Master Distributor');
    case 'Master Distributor':
      return user.superior_ado || await getSuperior(user.superior_ado, 'Area Development Officer');
    case 'Area Development Officer':
      return user.superior_id; // Assuming this is the Admin or the direct superior
    default:
      return null; // No higher role found
  }
};





/////////////*********** */ Get Orders **********//////////

exports.getOrdersByUser = async (req, res) => {
  const { user_id } = req.params; // Expecting user_id as a URL parameter

  try {
    // Check if user exists
    const orders = await Order.findAll({
      where: { user_id },
      include: [{
        model: OrderItem,
        as: 'OrderItems', // Make sure this matches the alias used in the Order model
        required: false, // Include order items if they exist
      }],
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    return res.status(200).json({ orders });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


/////////////see other member requested orderlist////////////
//////////////////////////////////////////////////////


// Fetch orders requested by lower hierarchy roles
exports.getOrdersBySubordinates = async (req, res) => {
  const userId = req.params.user_id; // The ID of the currently logged-in user

  try {
    // Fetch the logged-in user's role
    const currentUser = await User.findByPk(userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentRole = currentUser.role_name;

    // Fetch all subordinate users based on the current user's role
    const subordinates = await findSubordinateUsers(userId, currentRole);

    if (subordinates.length === 0) {
      return res.status(404).json({ message: 'No subordinates found' });
    }

    // Fetch orders requested by subordinates
    const subordinateIds = subordinates.map(user => user.id); // Extract subordinate user IDs
    const orders = await Order.findAll({
      where: { user_id: subordinateIds },
      include: [{
        model: OrderItem,
        as: 'OrderItems', // Specify the alias here
      }]
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for subordinates' });
    }

    return res.status(200).json({ orders });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Helper function to find subordinates based on the user's role
const findSubordinateUsers = async (userId, role) => {
  let whereCondition = {};

  switch (role) {
    case 'Area Development Officer':
      whereCondition = { superior_ado: userId };
      break;
    case 'Master Distributor':
      whereCondition = { superior_md: userId };
      break;
    case 'Super Distributor':
      whereCondition = { superior_sd: userId };
      break;
    case 'Distributor':
      whereCondition = { superior_d: userId };
      break;
    default:
      return []; // No subordinates for roles like Customer
  }

  return await User.findAll({
    where: whereCondition
  });
};



///////////*********get order detail**********/////////////// */

// Get Order Details
exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed in the request params

    const orderDetails = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: OrderItem,
          as: 'OrderItems', // Correct alias here
          include: [
            {
              model: Product,
              as: 'product', // Make sure this alias matches your Product model association
            },
          ],
        },
      ],
    });

    if (!orderDetails) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(orderDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

