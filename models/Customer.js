const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.ATLAS_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const orderedItems = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    products: [orderedItems],
    completed: {
        type: Boolean,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const favoriteSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const cartSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email address',
        },
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    orders: [orderSchema],
    favorites: [favoriteSchema],
    cart: [cartSchema]
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
