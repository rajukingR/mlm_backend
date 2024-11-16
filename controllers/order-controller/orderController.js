const { Order, OrderItem, Product, User, OrderLimit } = require('../../models');

// Create Order
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

    // Initialize total amount, total order volume (in liters), and an array for order items
    let totalAmount = 0;
    let totalOrderVolume = 0; // Store total volume in liters
    const orderItems = [];

    // Retrieve products in bulk
    const productIds = items.map(item => item.product_id);
    const products = await Product.findAll({ where: { id: productIds } });
    const productMap = new Map(products.map(product => [product.id, product]));

    // Calculate total amount, total order volume (in liters), and prepare order items
    for (let item of items) {
      const product = productMap.get(item.product_id);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product_id} not found` });
      }

      const itemTotalPrice = product.price * item.quantity;
      let itemVolume = parseFloat(product.productVolume) * item.quantity;

      // Convert volume to liters
      if (product.productVolume.includes("ml")) {
        itemVolume = itemVolume / 1000; // Convert milliliters to liters
      }

      totalAmount += itemTotalPrice;
      totalOrderVolume += itemVolume; // Add volume in liters
    
      orderItems.push({
        product_id: product.id,
        quantity: item.quantity,
        quantity_type: product.quantity_type,
        baseprice: product.price,
        final_price: itemTotalPrice,
        item_volume: itemVolume, // Include item_volume in OrderItem in liters
      });
    }

    // Final amount is the same as total amount
    const finalAmount = totalAmount;

    // Logic to determine the higher role ID based on user role
    // let higherRoleId = null;
    // higherRoleId = await getSuperior(user.id, userRole);
    let higherRoleId = await getSuperior(user.id); 

    // Create order with total order volume in liters
    const order = await Order.create({
      user_id,
      total_amount: totalAmount,
      coupon_code: coupon_code || null, // Allow NULL
      discount_applied: null, // Set discount applied as NULL for now
      final_amount: finalAmount,
      status: 'Pending', // Default status is 'Pending'
      requested_by_role: userRole, // Track who made the request
      higher_role_id: higherRoleId, // Next superior role ID
      total_order_quantity: totalOrderVolume, // Store the total order volume in liters
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
// const getSuperior = async (userId, userRole) => {
//   // Find the user to get the superior IDs
//   const user = await User.findByPk(userId);
//   if (!user) {
//     return null; // User not found, return null
//   }

//   switch (userRole) {
//     case 'Customer': // Assuming Customers are under Distributors
//       return user.superior_d || await getSuperior(user.superior_d, 'Distributor');
//     case 'Distributor':
//       return user.superior_sd || await getSuperior(user.superior_sd, 'Super Distributor');
//     case 'Super Distributor':
//       return user.superior_md || await getSuperior(user.superior_md, 'Master Distributor');
//     case 'Master Distributor':
//       return user.superior_ado || await getSuperior(user.superior_ado, 'Area Development Officer');
//     case 'Area Development Officer':
//       return user.superior_id; // Assuming this is the Admin or the direct superior
//     default:
//       return null; // No higher role found
//   }
// };
const getSuperior = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return null; 
  }

  return user.superior_id;
};




/////////////********** / Get Orders my**********//////////

exports.getOrdersByUser = async (req, res) => {
  const { user_id } = req.params; // Expecting user_id as a URL parameter

  try {
    // Check if user exists
    const orders = await Order.findAll({
      where: { user_id },
      include: [{
        model: OrderItem,
        as: 'OrderItems', // Make sure this matches the alias used in the Order model
        required: false,
        include: [
          {
            model: Product,
            as: 'product',
          },
        ],
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

const updateAssignedOrders = async () => {
  try {
    const roleTimeLimits = await OrderLimit.findAll(); 

<<<<<<< HEAD
    const roleTimeLimitMap = roleTimeLimits.reduce((acc, record) => {
      acc[record.role] = record.time_limit_hours;
      return acc;
    }, {});
=======
    // Calculate time limit (for simplicity, we're using 1 minute here)
    const timeLimit = new Date(Date.now() -  5 * 60 * 1000); // 1 minute time limit
>>>>>>> 8d480fef34010b8f7f29c002002c027282dee9c6

    // Fetch all orders with pending status
    const pendingOrders = await Order.findAll({
      where: { status: 'Pending' }
    });

    // Loop through each pending order
    for (const order of pendingOrders) {
      // Fetch the user's role based on the order's higher_role_id
      const user = await User.findOne({
        where: { id: order.higher_role_id }
      });

      if (user) {
        // Get the role and corresponding time limit for the current user
        const userRole = user.role; 
        const roleTimeLimit = roleTimeLimitMap[userRole];

        if (roleTimeLimit) {
          // Calculate the time limit based on the user's role
          const timeLimit = new Date(Date.now() - roleTimeLimit * 60 * 60 * 1000); 

          // Check if the order's updatedAt is older than the calculated time limit
          if (new Date(order.updatedAt) <= timeLimit) {
            const superiorId = user.superior_id; 
            const userRoleID = user.role_id;    

            // If there's a valid superiorId, update the order
            if (superiorId) {
              await Order.update(
                { higher_role_id: superiorId },
                { where: { id: order.id } }
              );
              console.log(`Order no ${order.id} was assigned to superior ID ${superiorId}.`);
            } else if (userRoleID) {
              // If no superiorId, fallback to userRoleID
              await Order.update(
                { higher_role_id: userRoleID },
                { where: { id: order.id } }
              );
              console.log(`Order no ${order.id} was assigned to role ID ${userRoleID}.`);
            } else {
              console.log(`No valid superior or user role ID found for order ${order.id}`);
            }

            // If the requested role is "Area Development Officer" and no superiorId, mark as Cancelled
            if (order.requested_by_role === "Area Development Officer" && !superiorId) {
              console.log(`Order no ${order.id} status already updated to Cancelled.`);
            }
          } else {
            console.log(`Order no ${order.id} was created recently, skipping update.`);
          }
        } else {
          console.log(`No time limit found for the role ${userRole} in order ${order.id}.`);
        }
      } else {
        console.log(`No user found with ID ${order.higher_role_id}.`);
      }
    }
  } catch (error) {
    console.error('Error updating orders:', error.message);
  }
};


// Set an interval to call the function every 30 seconds
// setInterval(updateAssignedOrders, 30 * 1000);

// Function to fetch orders requested by lower hierarchy roles
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
      where: { higher_role_id: userId  },
      include: [{
        model: OrderItem,
        as: 'OrderItems',
        include: [
          {
            model: Product,
            as: 'product',
          },
        ], // Include order items if they exist
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
// const findSubordinateUsers = async (userId, role) => {
//   let whereCondition = {};

//   switch (role) {
//     case 'Area Development Officer':
//       whereCondition = { superior_ado: userId };
//       break;
//     case 'Master Distributor':
//       whereCondition = { superior_md: userId };
//       break;
//     case 'Super Distributor':
//       whereCondition = { superior_sd: userId };
//       break;
//     case 'Distributor':
//       whereCondition = { superior_d: userId };
//       break;
//     default:
//       return []; // No subordinates for roles like Customer
//   }

//   return await User.findAll({
//     where: whereCondition
//   });
// };
// Helper function to find subordinates based on the user's role
const findSubordinateUsers = async (userId) => {
  // Get the user's superior_id (they are subordinates under this ID)
  const user = await User.findByPk(userId);
  if (!user) {
    return [];
  }

  return await User.findAll({
    where: { superior_id: userId } // Fetch users whose superior_id is the logged-in user
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



//////////////Cncel Order ////////////////////
//////////////////////////////////////////////

exports.cancelOrder = async (req, res) => {
  const { orderId } = req.params; // Extract orderId from the URL parameters
  const userId = req.user.id; // Assuming you get the user ID from the decoded token

  try {
    // Find the order by ID
    const order = await Order.findOne({ where: { id: orderId } });

    // Check if the order exists
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the user is the creator of the order
    if (order.user_id !== userId) {
      return res.status(403).json({ message: 'You are not authorized to cancel this order' });
    }

    // Update the order status to 'Cancelled'
    order.status = 'Cancelled';
    await order.save();

    return res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


/////////Accept Ordr by hiery hirarchy////////////////
//////////////Accepted means sended //////////////////////////
// In your orderController.js
exports.acceptOrder = async (req, res) => {
    const { orderId } = req.params;
    const { id: userId } = req.user; // Extract 'id' from req.user (the logged-in user's ID)

    try {
        // Log the orderId and userId for debugging
        console.log("Accepting Order - Order ID:", orderId, "User ID:", userId);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. No user ID found." });
        }

        // Find the order by its ID and ensure the logged-in user is the 'higher_role_id' (the person the order was requested to)
        const order = await Order.findOne({ where: { id: orderId, higher_role_id: userId } });

        if (!order) {
            return res.status(404).json({ message: "Order not found or you are not authorized to accept this order." });
        }

        // Update order status to 'Accepted'
        order.status = 'Accepted';
        await order.save();

        res.status(200).json({ message: "Order accepted successfully.", order });
    } catch (error) {
        console.error("Error while accepting order:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};








