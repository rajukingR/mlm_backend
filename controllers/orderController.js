const { Order, User, OrderLimit } = require('../models'); // Import necessary models

// Function to update assigned orders
const updateAssignedOrders = async () => {
  try {
    // Fetch the order limit
    const orderLimitRecord = await OrderLimit.findOne({
      order: [['createdAt', 'DESC']] // Assuming you want the latest record
    });

    const hours = orderLimitRecord ? orderLimitRecord.hours : 48; // Default to 48 hours if not found
    const timeLimit = new Date(Date.now() - hours * 60 * 60 * 1000); // Calculate time limit

    // Fetch all orders with pending status
    const pendingOrders = await Order.findAll({
      where: { status: 'Pending' }
    });

    // Loop through each pending order
    for (const order of pendingOrders) {
      // Check if the order's createdAt is older than the calculated time limit
      if (new Date(order.createdAt) <= timeLimit) {
        // Fetch the user based on the current order's higher_role_id
        const user = await User.findOne({
          where: { id: order.higher_role_id }
        });

        if (user) {
          const superiorId = user.superior_id; // Get the superior ID
          const requestedByRole = user.role_name; // Get the user's role name

          // Update the order's higher_role_id and requested_by_role
          await Order.update(
            {
              higher_role_id: superiorId,
              requested_by_role: requestedByRole // Update the requested_by_role
            },
            { where: { id: order.id } }
          );

          console.log(`Order no ${order.id} was assigned to superior ID ${superiorId} and requested by role updated to ${requestedByRole}`);

          // Check if requested_by_role is "Area Development Officer"
          if (requestedByRole === "Area Development Officer") {
            // Update the order status to "Cancelled"
            await Order.update(
              { status: 'Cancelled' },
              { where: { id: order.id } }
            );

            console.log(`Order no ${order.id} status updated to Cancelled.`);
          }
        } else {
          console.log(`No user found with ID ${order.higher_role_id}.`);
        }
      } else {
        console.log(`Order no ${order.id} was created within the last ${hours} hours, skipping update.`);
      }
    }
  } catch (error) {
    console.error('Error updating orders:', error.message);
  }
};

// Set an interval to call the function every 30 seconds
// setInterval(updateAssignedOrders, 30 * 1000);

// Express route handler to fetch pending orders
exports.fetchOrders = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Order.findAll();

    const currentTime = new Date();
    const timeLimit = new Date(currentTime.getTime() - 2 * 60 * 1000); // 2 minutes ago

    // Initialize an empty array to hold filtered orders
    const filteredOrders = [];

    // Loop through each order to apply conditions
    for (const order of orders) {
      // Check if the order matches the criteria
      if (
        order.status === "Pending" &&
        new Date(order.createdAt) <= timeLimit &&
        order.higher_role_id === 55 // Adjust this condition as necessary based on your requirements
      ) {
        // Push the order to filtered array if it meets criteria
        filteredOrders.push(order);
      }
    }

    // Send response with filtered orders
    return res.status(200).json({
      success: true,
      data: filteredOrders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};
