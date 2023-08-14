const Customer = require('../models/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pino = require('pino');

const logger = pino({
    level: 'info',
    useLevelLabels: true, // Display log level names (INFO, WARN, etc.) instead of numbers
});

const secretKey = process.env.SECRET_KEY;

// Register a new Customer
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        logger.info(`Credentials: { email: ${email}, password: ${password}}`);

        // Check if the email already exists
        const existingUser = await Customer.findOne({ email }).maxTimeMS(2000);

        if (existingUser) {
            logger.info(`User Already Exists: ${existingUser}`);
            return res.status(409).json({ message: 'Email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        logger.info(`Hashed Password: ${hashedPassword}`);

        // Create a new Customer
        const newUser = new Customer({
            email,
            password: hashedPassword,
        });

        // Save the Customer to the database
        const saveMsg = await newUser.save({ maxTimeMS: 20000 });
        logger.info(`Saved Data: ${saveMsg}`);

        // Respond with success message
        res.status(201).json({ message: 'Customer registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Authenticate and generate an access token for the Customer
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the Customer by email
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(401).json({ message: 'Invalid email' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, customer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: customer._id, email: customer.email }, secretKey, { expiresIn: '24h' });

        // Store the JWT in a cookie
        res.cookie('token', token, { httpOnly: true });

        // Respond with the token
        res.status(200).json({ token, message: 'Login successful', customer });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Function to handle Customer logout
const logout = (req, res) => {
    // Clear the JWT cookie
    res.clearCookie('token');

    // Respond with a success message
    res.status(200).json({ message: "Logout successful" });
};

module.exports = { signup, login, logout };
