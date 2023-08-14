const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

const { authorize } = require('../middlewares/auth');
const authenticator = require('../controllers/Authenticator');
const customer = require('../controllers/Customer');

dotenv.config();

const BASE_URL = '/account/:_id';

// Authanticate and Authorize
router.post('/signup', authenticator.signup);
router.post('/login', authenticator.login);
router.post('/logout', authenticator.logout);

//Fetch Product Details
router.get(`/products/:product_id`, customer.products.getProductById);

// GET /api/products
router.get('/products', customer.products.listProducts);

// Fetch Details
router.get(`${BASE_URL}`, authorize, customer.profile.getDetails);

router.get(`${BASE_URL}/cart`, authorize, customer.cart.getAllItems);
router.get(`${BASE_URL}/orders`, authorize, customer.orders.getAllItems);
router.get(`${BASE_URL}/favorites`, authorize, customer.favorites.getAllItems);

router.get(`${BASE_URL}/favorites/:favorite_id`, authorize, customer.favorites.getItemById);
router.get(`${BASE_URL}/orders/:order_id`, authorize, customer.orders.getItemById);
router.get(`${BASE_URL}/cart/:item_id`, authorize, customer.cart.getItemById);

// Push Details
router.put(`${BASE_URL}`, authorize, customer.profile.updateDetails); // Update account details

router.post(`${BASE_URL}/favorites`, authorize, customer.favorites.addItem); // Add item to favorite
router.post(`${BASE_URL}/orders`, authorize, customer.orders.addItem); // Order an item
router.post(`${BASE_URL}/cart`, authorize, customer.cart.addItem);

// Remove Details
router.delete(`${BASE_URL}/favorites/:favorite_id`, authorize, customer.favorites.removeItem); // Remove item from favorites
router.delete(`${BASE_URL}/orders/:order_id`, authorize, customer.orders.removeItem); // Withdraw an Order
router.delete(`${BASE_URL}/cart/:item_id`, authorize, customer.cart.removeItem);
router.delete(`${BASE_URL}`, authorize, customer.profile.deleteDetails); // Delete account details

module.exports = router;