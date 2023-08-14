const Customer = require('../../models/Customer');

const Cart = {
    getAllItems: async (req, res) => {
        try {
            const customerId = req.params._id;

            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            const cart = customer.cart;

            res.status(200).json({ cart });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    getItemById: async (req, res) => {
        try {
            const customerId = req.params._id;
            const productId = req.params.item_id;

            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            const item = customer.cart.id(productId);
            if (!item) {
                return res.status(404).json({ message: 'Item not found in Cart' });
            }

            res.status(200).json({ item });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    addItem: async (req, res) => {
        try {
            const customerId = req.params._id;
            const productId = req.body.PRODUCT_ID;
            const quantity = req.body.quantity;

            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            const item = {
                productId,
                quantity,
            };

            customer.cart.push(item);

            const updatedCustomer = await customer.save();
            const item_id = updatedCustomer.cart[updatedCustomer.cart.length - 1]._id;

            res.status(200).json({ item_id });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    removeItem: async (req, res) => {
        try {
          const customerId = req.params._id;
          const productId = req.params.item_id;
      
          const customer = await Customer.findById(customerId);
          if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
          }
      
          // To remove an item from the cart, use the 'remove' method of the subdocument array
          const item = customer.cart.id(productId);
          if (!item) {
            return res.status(404).json({ message: 'Item not found in Cart' });
          }
      
          // No need to find the index and splice the array manually. Just use 'remove' method.
          customer.cart.remove(item);
      
          await customer.save();
      
          res.status(200).json({ item });
        } catch (error) {
          res.status(500).json({ error });
        }
      }      
};

module.exports = Cart;