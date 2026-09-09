const express = require('express');
const { getMyBids } = require('../controllers/bidController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/my', protect, getMyBids);

module.exports = router;
