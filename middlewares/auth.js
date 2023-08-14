const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authorize = (req, res, next) => {
    // Check if the token exists in the request headers, cookies, or wherever it is stored
    const token = req.cookies.token;

    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Missing token.' });
    }

    try {
        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        // Attach the customer information to the request object
        req.customer = decodedToken;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = { authorize };