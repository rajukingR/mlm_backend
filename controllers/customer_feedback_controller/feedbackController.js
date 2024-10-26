// const { Feedback, Order, OrderItem,User } = require('../../models');
const { Feedback, Order, OrderItem, User} = require('../../models');
const { Op } = require('sequelize');

exports.createFeedback = async (req, res) => {
    try {
        const { user_id, product_id, order_id, rating, comments } = req.body;

        // Check for required fields
        if (!user_id || !product_id || !order_id || !rating || !comments) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5." });
        }

        // Check if order exists and is either completed or accepted
        const order = await Order.findOne({ 
            where: { 
                id: order_id, 
                user_id, 
                [Op.or]: [
                    { status: 'Completed' },
                    { status: 'Accepted' }
                ]
            } 
        });
        if (!order) {
            return res.status(400).json({ message: "Order not found or not completed." });
        }

        // Check if product exists in the order items
        const orderItem = await OrderItem.findOne({ where: { order_id, product_id } });
        if (!orderItem) {
            return res.status(400).json({ message: "Product not found in the specified order." });
        }

        // Check if feedback already exists for this user, product, and order
        const existingFeedback = await Feedback.findOne({
            where: { user_id, product_id, order_id }
        });
        if (existingFeedback) {
            return res.status(400).json({ message: "Feedback already submitted for this product in the specified order." });
        }

        // Create feedback entry
        const feedback = await Feedback.create({
            user_id,
            product_id,
            order_id,
            rating,
            comments,
            feedback_date: new Date(),
        });

        return res.status(201).json({ message: "Feedback created successfully!", feedback });
    } catch (error) {
        console.error("Error creating feedback:", error);
        return res.status(500).json({ message: "An error occurred while creating feedback." });
    }
};



///////////////*************/////////////////////
//////////////////////////////////////////////////

exports.getFeedbackForHigherRole = async (req, res) => {
    try {
        const { higher_role_id } = req.params;

        const feedbacks = await Feedback.findAll({
            include: [
                {
                    model: Order,
                    as: 'order',
                    where: { higher_role_id },
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'full_name'],
                },
            ],
        });

        if (feedbacks.length === 0) {
            return res.status(404).json({ message: "No feedback found for this hierarchy." });
        }

        return res.status(200).json({ feedbacks });
    } catch (error) {
        console.error("Error fetching feedback for hierarchy:", error);
        return res.status(500).json({ message: "An error occurred while fetching feedback." });
    }
};
