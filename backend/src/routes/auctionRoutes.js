const express = require('express');
const {
  createAuction,
  getAuctions,
  getAuctionById,
  getMyAuctions,
  closeAuction,
} = require('../controllers/auctionController');
const { placeBid, getBidsForAuction } = require('../controllers/bidController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// IMPORTANT: /my must be registered before /:id, otherwise Express will
// try to treat "my" as an auction ID.
router.get('/my', protect, getMyAuctions);

router.post('/', protect, createAuction);
router.get('/', getAuctions);
router.get('/:id', getAuctionById);
router.patch('/:id/close', protect, closeAuction);

// Bids nested under a specific auction.
router.post('/:auctionId/bids', protect, placeBid);
router.get('/:auctionId/bids', getBidsForAuction);

module.exports = router;
