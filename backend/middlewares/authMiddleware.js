const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const protect = async (req,resizeBy,next) => {
    try {
        let token = req.headers.authorization;

        if(token && token.startsWith('Bearer')) {
            token = token.split(' ')[1];
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } else {
            res.status(401).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        res.status(401).json({ message: 'token failed' ,error:error.message});
    }
}

module.exports = { protect };