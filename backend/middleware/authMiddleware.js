const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { verifyToken } = require('../helpers/tokenHelper');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get Token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify Token
            const decoded = verifyToken(token);

            //Get user from token
            req.user = await User.findOne({ _id: decoded.id }).select('-password');
            next();

        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Unauthorized');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('Unauthorized, no token');
    }
});


module.exports = {
    protect
};