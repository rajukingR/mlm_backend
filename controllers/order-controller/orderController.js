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

    // No discount logic applied yet, so discount_applied remains null
    const finalAmount = totalAmount; // Final amount is the same as total amount

    // Create order
    const order = await Order.create({
      user_id,
      total_amount: totalAmount,
      coupon_code: coupon_code || null, // Allow NULL
      discount_applied: null, // Set discount applied as NULL for now
      final_amount: finalAmount,
      status: 'Pending', // Default status is 'Pending'
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
