const { Order, OrderItem, Product, User } = require('../../models'); 
// Create Order
exports.createOrder = async (req, res) => {
    const { items } = req.body;
    const user_id = req.user.id; // Get user ID from token
  
    // Validate input
    if (!user_id || !items || items.length === 0) {
      return res.status(400).json({ error: 'User ID and items are required.' });
    }
  
    try {
      // Calculate total amount
      let totalAmount = 0;
  
      for (const item of items) {
        const product = await Product.findByPk(item.product_id); // Get product details
        if (!product) {
          return res.status(400).json({ error: `Product ID ${item.product_id} not found.` });
        }
        const finalPrice = product.price * item.quantity; // Calculate price based on quantity
        totalAmount += finalPrice;
      }
  
      // Create order
      const newOrder = await Order.create({
        user_id,
        order_date: new Date(),
        total_amount: totalAmount,
        created_at: new Date()
      });
  
      // Create order items
      const orderItems = items.map(item => ({
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        quantity_type: product.quantity_type,
        baseprice: product.price,
        final_price: product.price * item.quantity
      }));
  
      await OrderItem.bulkCreate(orderItems); // Bulk create order items
  
      res.status(201).json({ message: 'Order created successfully.', order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
};
