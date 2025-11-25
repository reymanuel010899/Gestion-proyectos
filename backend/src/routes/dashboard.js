const express = require('express');
const { getDashboard} = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/get-details', authMiddleware,  getDashboard);

module.exports = router;
