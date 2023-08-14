const Orders = require('./customer/Orders');
const Favorites = require('./customer/Favorites');
const Profile = require('./customer/Profile');
const Cart = require('./customer/Cart');
const Products = require('./products/Products');

const Customer = {
    favorites: Favorites,
    orders: Orders,
    profile: Profile,
    cart: Cart,
    products: Products,
};

module.exports = Customer;