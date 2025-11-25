const express = require('express');
const { register, login, getProfile, getProfiles } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.get('/list-profile', authMiddleware, getProfiles);

module.exports = router;
