const express = require('express');
const {
  getUsers,
  verifyUser,
  getPendingAuctions,
  approveAuction,
  rejectAuction,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Every route in this file requires the caller to be an authenticated admin.
router.use(protect, isAdmin);

router.get('/users', getUsers);
router.patch('/users/:id/verify', verifyUser);

router.get('/auctions/pending', getPendingAuctions);
router.patch('/auctions/:id/approve', approveAuction);
router.patch('/auctions/:id/reject', rejectAuction);

module.exports = router;
