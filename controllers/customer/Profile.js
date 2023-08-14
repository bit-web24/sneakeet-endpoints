const Customer = require('../../models/Customer');
const pino = require('pino');

const logger = pino({
    level: 'info',
    useLevelLabels: true, // Display log level names (INFO, WARN, etc.) instead of numbers
  });  

const Profile = {
    getDetails: async (req, res) => {
        try {
            const customerId = req.params._id;
            logger.info(customerId);

            const customer = await Customer.findById(customerId);
            logger.info(customer);

            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            res.status(200).json({ message: 'Customer Found', customer });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateDetails: async (req, res) => {
        try {
            const customerId = req.params._id;

            const customer = await Customer.findById(customerId);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found' });
            }

            // customer.email = req.body.customer.emai || customer.email;
            // customer.password = req.body.customer.password || customer.password;
            customer.phone = req.body.customer.phone || customer.phone;
            customer.address = req.body.customer.address || customer.address;
            customer.updatedAt = Date.now();

            await customer.save();

            res.status(200).json({ message: 'Customer details updated', customer });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteDetails: async (req, res) => {
        // Extract the customer ID from the request parameters
        const customerId = req.params._id;
        logger.warn("deleting customer...");
        logger.info(customerId);
    
        try {
            const customer = await Customer.findByIdAndDelete(customerId);
            logger.info(customer);
    
            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }
    
            res.status(200).json({ message: 'Customer deleted successfully', customerId });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error deleting Customer' });
        }
    }    
};

module.exports = Profile;
