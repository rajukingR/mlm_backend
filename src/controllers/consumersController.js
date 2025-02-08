const { Consumer, ConsumerProduct } = require('../models');

exports.createConsumer = async (req, res) => {
    const { firstName, mobileNumber, email, activeStatus, selectedProducts } = req.body;

    try {
        // Get the logged-in user's role_id from the token
        const loggedInUserRoleId = req.user.role_id;

        // Ensure the user has permission to create a consumer
        if (![1, 2].includes(loggedInUserRoleId)) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to create a consumer.',
            });
        }

        // Create the consumer with the appropriate role_id
        const consumer = await Consumer.create({
            first_name: firstName,
            mobile_number: mobileNumber,
            email,
            active_status: activeStatus === 'true' || activeStatus === true ? 1 : 0,
            role_id: loggedInUserRoleId, // Explicitly set role_id
        });

        // If selectedProducts is provided and not empty, create ConsumerProduct records
        if (Array.isArray(selectedProducts) && selectedProducts.length > 0) {
            const consumerProducts = selectedProducts.map((productId) => ({
                consumer_id: consumer.id,
                product_id: productId,
            }));

            await ConsumerProduct.bulkCreate(consumerProducts);
        }

        return res.status(201).json({
            success: true,
            message: 'Consumer created successfully.',
            data: consumer,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the consumer.',
            error: error.message,
        });
    }
};



/////CONSUMER UPDATE//////////////


exports.updateConsumer = async (req, res) => {
    const { id } = req.params; // Get the consumerId from the URL parameter
    const { firstName, mobileNumber, email, activeStatus, selectedProducts } = req.body;

    try {
        // Find the consumer by ID
        const consumer = await Consumer.findByPk(id); // Use the 'id' from URL parameters
        
        if (!consumer) {
            return res.status(404).json({
                success: false,
                message: 'Consumer not found.',
            });
        }

        // Update the consumer's details
        await consumer.update({
            first_name: firstName,
            mobile_number: mobileNumber,
            email,
            active_status: activeStatus === 'true' || activeStatus === true ? 1 : 0,
        });

        // Remove any existing ConsumerProduct records for this consumer
        await ConsumerProduct.destroy({
            where: {
                consumer_id: consumer.id,
            },
        });

        // If selectedProducts is provided and not empty, create new ConsumerProduct records
        if (Array.isArray(selectedProducts) && selectedProducts.length > 0) {
            const consumerProducts = selectedProducts.map((productId) => ({
                consumer_id: consumer.id,
                product_id: productId,
            }));

            // Bulk insert new ConsumerProduct records
            await ConsumerProduct.bulkCreate(consumerProducts);
        }

        return res.status(200).json({
            success: true,
            message: 'Consumer updated successfully.',
            data: consumer,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the consumer.',
            error: error.message,
        });
    }
};


////////////Get all consumers///////////



exports.getAllConsumers = async (req, res) => {
    try {
        const consumers = await Consumer.findAll(); // Retrieve all consumers
        return res.status(200).json({
            success: true,
            data: consumers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching consumers.',
            error: error.message,
        });
    }
};



// Get a consumer by ID
exports.getConsumerById = async (req, res) => {
    const { id } = req.params; // Get the consumer ID from the URL

    try {
        // Find consumer by primary key along with associated ConsumerProduct records
        const consumer = await Consumer.findByPk(id, {
            include: [{
                model: ConsumerProduct,  // Specify the ConsumerProduct model
                as: 'consumerProducts',  // Use the alias as defined in the association
                attributes: ['product_id'] // Specify which fields you want to include
            }],
        });

        if (!consumer) {
            return res.status(404).json({
                success: false,
                message: 'Consumer not found.',
            });
        }

        return res.status(200).json({
            success: true,
            data: consumer,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the consumer.',
            error: error.message,
        });
    }
};

// Delete a consumer by ID
exports.deleteConsumer = async (req, res) => {
    const { id } = req.params; // Get the consumer ID from the URL

    try {
        // Find the consumer by ID
        const consumer = await Consumer.findByPk(id);

        if (!consumer) {
            return res.status(404).json({
                success: false,
                message: 'Consumer not found.',
            });
        }

        // Delete associated products first
        await ConsumerProduct.destroy({
            where: { consumer_id: consumer.id },
        });

        // Now, delete the consumer record
        await consumer.destroy();

        return res.status(200).json({
            success: true,
            message: 'Consumer deleted successfully.',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the consumer.',
            error: error.message,
        });
    }
};