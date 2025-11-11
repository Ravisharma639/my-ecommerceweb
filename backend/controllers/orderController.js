// Example of logging needed in backend/controllers/orderController.js
export const createOrder = async (req, res) => {
    // 1. Check incoming data
    console.log('--- Incoming Order Data ---');
    console.log(req.body);
    console.log('User ID from Token:', req.user._id); // Check if req.user exists

    // 2. Mongoose Save Logic
    try {
        // ... rest of your Mongoose logic to create the order ...
        const order = await Order.create({
            user: req.user._id, // Ensure this is present
            // ... other fields
        });
        res.status(201).json({ orderId: order._id, message: 'Order created' });
    } catch (error) {
        // 3. Log the specific Mongoose error
        console.error('--- Mongoose Order Validation/Save Error ---');
        console.error(error); // This will tell you exactly which field is missing or invalid
        res.status(400).json({ message: error.message || 'Order data invalid' });
    }
};