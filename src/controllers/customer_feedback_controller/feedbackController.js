// const { Feedback, Order, User } = require('../../models');
const { Feedback, Order, User, Product } = require('../../../models');
const { Op } = require('sequelize');

exports.createFeedback = async (req, res) => {
    try {
        const { user_id, order_id, rating, comments, product_id } = req.body;

        // Check for required fields
        if (!user_id || !order_id || !rating || !comments || !product_id) {
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

        const product = await Product.findOne({
            where: {
                id: product_id,
            }
        });

        if (!product) {
            return res.status(400).json({ message: "Product Not Found for this ID" });
        }

        if (!order) {
            return res.status(400).json({ message: "Order not found or not completed." });
        }

        // Check if feedback already exists for this user and order
        const existingFeedback = await Feedback.findOne({
            where: { user_id, order_id, product_id }
        });
        if (existingFeedback) {
            return res.status(400).json({ message: "Feedback already submitted for this order." });
        }

        // Create feedback entry
        const feedback = await Feedback.create({
            user_id,
            order_id,
            product_id,
            rating,
            comments,
            feedback_date: new Date(),
        });

        return res.status(201).json({ message: "Feedback created successfully!", feedback });
    } catch (error) {
        console.error("Error creating feedback:", error);
        return res.status(500).json({
            message: "An error occurred while creating feedback.",
            error: error.message || error // Return the specific error message
        });
    }
};





///////////////*************/////////////////////
//////////////////////////////////////////////////need product image name

exports.getFeedbackForHigherRole = async (req, res) => {
    try {
        const { higher_role_id } = req.params;

        const feedbacks = await Feedback.findAll({
            include: [
                {
                    model: Order,
                    as: 'order',
                    attributes: ['id', 'order_id', 'higher_role_id', 'total_order_quantity', 'createdAt', 'total_amount'], // Include `order_id`
                    where: { higher_role_id },
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'full_name', 'image', 'club_name'],
                },
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'image', 'product_code'],
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

///////ADMIN GET CUSTOMERS FEEDBACKS//////



exports.AdMINgetFeedback = async (req, res) => {
    try {
        const higher_role_id = 1;

        const feedbacks = await Feedback.findAll({
            include: [
                {
                    model: Order,
                    as: 'order',
                    where: { higher_role_id }, // Using the directly set value
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'full_name', 'image', 'club_name'],
                },
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'image', 'product_code'],
                }
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

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// Assuming Feedback, User, and Order models are set up as in previous APIs

exports.getFeedbackForCustomer = async (req, res) => {
    try {
        const { customer_id } = req.params;  // `customer_id` could be passed as a parameter

        const feedbacks = await Feedback.findAll({
            where: { user_id: customer_id },  // Filter by customer ID
            include: [
                {
                    model: Order,
                    as: 'order',
                    attributes: ['id', 'total_amount', 'status'],  // Include relevant order fields
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'full_name', 'image', 'club_name'],
                },
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'image', 'product_code'],
                }
            ],
        });

        if (feedbacks.length === 0) {
            return res.status(404).json({ message: "No feedback found for this customer." });
        }

        return res.status(200).json({ feedbacks });
    } catch (error) {
        console.error("Error fetching feedback for customer:", error);
        return res.status(500).json({ message: "An error occurred while fetching feedback for the customer." });
    }
};

