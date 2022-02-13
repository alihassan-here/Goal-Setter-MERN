const express = require('express');
const router = express.Router();

const { regiseterUser,
    loginUser,
    getMe
} = require('../controllers/userController');

//Route Protection middleware
const { protect } = require('../middleware/authMiddleware');

router.post('/', regiseterUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);




module.exports = router;