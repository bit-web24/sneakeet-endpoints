const Customer = require('../../models/Customer');

const Orders = {
    getAllItems: async (req, res) => {
        try {
            const customerId = req.params._id;

            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            const orders = customer.orders;

            res.status(200).json({ message: 'Found orders', orders });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getItemById: async (req, res) => {
        try {
            const customerId = req.params._id;
            const orderId = req.params.order_id;

            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            const order = customer.orders.id(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json({ order });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    addItem: async (req, res) => {
        try {
            const customerId = req.params._id;
            const items = req.body.products;

            const customer = await Customer.findById(customerId);

            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            // Create a new order object based on the orderSchema
            const newOrder = {
                products: items,
                completed: false,
                status: "Order was Successful",
            };

            // Push the new order to the customer's orders array
            const orderIndex = customer.orders.push(newOrder) - 1;
            const addedOrder = customer.orders[orderIndex];

            // Save the updated customer object to the database
            await customer.save();

            res.status(201).json({ order: addedOrder });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    },


    removeItem: async (req, res) => {
        try {
            const customerId = req.params._id;
            const orderId = req.params.order_id;

            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            const order = customer.orders.id(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Remove the item from the order
            const itemIndex = customer.orders.indexOf(order);
            if (itemIndex > -1) {
                customer.orders.splice(itemIndex, 1);
            }

            await customer.save();

            res.status(200).json({ orders: customer.orders });
        } catch (error) {
            res.status(500).json({ error });
        }
    }

};

module.exports = Orders;