const Auction = require('../models/Auction');
const Bid = require('../models/Bid');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const sendResponse = require('../utils/sendResponse');

// @route   POST /api/auctions/:auctionId/bids
// @access  Private
const placeBid = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const { auctionId } = req.params;

  if (amount === undefined || amount === null) {
    throw new ApiError(400, 'Bid amount is required');
  }

  if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
    throw new ApiError(400, 'Bid amount must be a positive number');
  }

  const auction = await Auction.findById(auctionId);

  if (!auction) {
    throw new ApiError(404, 'Auction not found');
  }

  if (auction.status === 'closed') {
    throw new ApiError(400, 'This auction is closed and no longer accepts bids');
  }

  if (auction.status === 'rejected') {
    throw new ApiError(400, 'This auction was rejected and cannot receive bids');
  }

  if (auction.status !== 'active') {
    throw new ApiError(400, 'This auction is not active yet');
  }

  if (new Date() > new Date(auction.endTime)) {
    throw new ApiError(400, 'This auction has already ended');
  }

  if (auction.owner.toString() === req.user._id.toString()) {
    throw new ApiError(403, 'You cannot bid on your own auction');
  }

  // Determine the current highest bid directly from the Bid collection
  // (rather than trusting auction.currentPrice alone) to stay consistent
  // even if currentPrice was ever out of sync.
  const highestBid = await Bid.findOne({ auction: auction._id }).sort({ amount: -1 });

  if (highestBid) {
    if (amount <= highestBid.amount) {
      throw new ApiError(
        400,
        `Bid amount must be greater than the current highest bid (${highestBid.amount})`
      );
    }
  } else if (amount < auction.startingPrice) {
    throw new ApiError(
      400,
      `Bid amount must be greater than or equal to the starting price (${auction.startingPrice})`
    );
  }

  const bid = await Bid.create({
    auction: auction._id,
    bidder: req.user._id,
    amount,
  });

  auction.currentPrice = amount;
  await auction.save();

  const populatedBid = await bid.populate('bidder', 'name email');

  return sendResponse(res, 201, 'Bid placed successfully', {
    bid: populatedBid,
    currentPrice: auction.currentPrice,
  });
});

// @route   GET /api/auctions/:auctionId/bids
// @access  Public
const getBidsForAuction = asyncHandler(async (req, res) => {
  const { auctionId } = req.params;

  const auction = await Auction.findById(auctionId);
  if (!auction) {
    throw new ApiError(404, 'Auction not found');
  }

  const bids = await Bid.find({ auction: auctionId })
    .populate('bidder', 'name email')
    .sort({ amount: -1, createdAt: -1 });

  return sendResponse(res, 200, 'Bids fetched successfully', bids);
});

// @route   GET /api/bids/my
// @access  Private
const getMyBids = asyncHandler(async (req, res) => {
  const bids = await Bid.find({ bidder: req.user._id })
    .populate({
      path: 'auction',
      select: 'title status currentPrice startingPrice endTime owner winner',
    })
    .sort({ createdAt: -1 });

  return sendResponse(res, 200, 'Your bids fetched successfully', bids);
});

module.exports = { placeBid, getBidsForAuction, getMyBids };
