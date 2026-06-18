import Order from '../models/order.js';

export const createOrder = async (req, res) => {
    try {
        const { items, shippingDetails, shippingCost } = req.body;
        const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
        const total = subtotal + shippingCost;
        const order= new Order({
            user: req.user._id,
            items,
            shippingDetails,
            subtotal: subtotal,
            shippingCost: shippingCost,
            total: total
        });
        console.log(order);
        await order.save();
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
}



export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('user');
        res.status(200).json( {orders} );
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
}