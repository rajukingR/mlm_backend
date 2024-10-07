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









































// const { Order, OrderItem, Product, User } = require('../../models');

// // Create Order
// exports.createOrder = async (req, res) => {
//   const { user_id, items, coupon_code } = req.body; // coupon_code is optional

//   try {
//     // Check if user exists
//     const user = await User.findByPk(user_id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Validate items input
//     if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ message: 'Items must be a non-empty array' });
//     }

//     // Determine user role
//     const userRole = user.role_name; // Assuming role_name is how you identify user roles

//     // Initialize total amount and an array for order items
//     let totalAmount = 0;
//     const orderItems = [];

//     // Retrieve products in bulk
//     const productIds = items.map(item => item.product_id);
//     const products = await Product.findAll({ where: { id: productIds } });
//     const productMap = new Map(products.map(product => [product.id, product]));

//     // Calculate total amount and prepare order items
//     for (let item of items) {
//       const product = productMap.get(item.product_id);
//       if (!product) {
//         return res.status(404).json({ message: `Product with ID ${item.product_id} not found` });
//       }
//       totalAmount += product.price * item.quantity;

//       orderItems.push({
//         product_id: product.id,
//         quantity: item.quantity,
//         quantity_type: product.quantity_type,
//         baseprice: product.price,
//         final_price: product.price * item.quantity,
//       });
//     }

//     // Final amount is the same as total amount
//     const finalAmount = totalAmount;

//     // Logic to determine the higher role ID based on user role
//     let higherRoleId = null;

//     if (userRole === 'Distributor') {
//       // Find the SD or MD to whom the order should be directed
//       higherRoleId = await getSuperior(user_id, 'Super Distributor'); // Implement this function
//     } else if (userRole === 'Super Distributor') {
//       higherRoleId = await getSuperior(user_id, 'Master Distributor'); // Implement this function
//     } else if (userRole === 'Master Distributor') {
//       higherRoleId = await getSuperior(user_id, 'Area Development Officer'); // Implement this function
//     }

//     // Create order
//     const order = await Order.create({
//       user_id,
//       total_amount: totalAmount,
//       coupon_code: coupon_code || null, // Allow NULL
//       discount_applied: null, // Set discount applied as NULL for now
//       final_amount: finalAmount,
//       status: 'Pending', // Default status is 'Pending'
//       requested_by_role: userRole, // Track who made the request
//       higher_role_id: higherRoleId, // Next superior role ID
//     });

//     // Bulk create order items
//     await OrderItem.bulkCreate(orderItems.map(item => ({
//       ...item,
//       order_id: order.id
//     })));

//     return res.status(201).json({ message: 'Order created successfully', order });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// };

// // Implement this function to find the superior based on role
// const getSuperior = async (userId, superiorRole) => {
//   // Your logic to find the superior based on userId and superiorRole
//   // This function should return the ID of the higher role user
//   const superior = await User.findOne({
//     where: {
//       role_name: superiorRole,
//       // Your logic to find the correct superior in your hierarchy
//     }
//   });
//   return superior ? superior.id : null; // Return the superior ID or null
// };
