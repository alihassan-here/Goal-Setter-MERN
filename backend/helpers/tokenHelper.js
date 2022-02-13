const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    const token = jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    return token;
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return false;
    }
}

module.exports = {
    generateToken,
    verifyToken
};
