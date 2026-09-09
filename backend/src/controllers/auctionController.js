const Auction = require('../models/Auction');
const Bid = require('../models/Bid');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const sendResponse = require('../utils/sendResponse');

// @route   POST /api/auctions
// @access  Private (verified users only)
const createAuction = asyncHandler(async (req, res) => {
  if (!req.user.isVerified) {
    throw new ApiError(403, 'Only verified users can create auctions');
  }

  const { title, description, image, startingPrice, startTime, endTime } = req.body;

  if (!title || !description || startingPrice === undefined || !startTime || !endTime) {
    throw new ApiError(
      400,
      'title, description, startingPrice, startTime and endTime are required'
    );
  }

  if (startingPrice < 0) {
    throw new ApiError(400, 'startingPrice cannot be negative');
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new ApiError(400, 'startTime and endTime must be valid dates');
  }

  if (end <= start) {
    throw new ApiError(400, 'endTime must be after startTime');
  }

  // owner, status, currentPrice and approvedByAdmin are never taken from
  // the client — they are always derived server-side.
  const auction = await Auction.create({
    title,
    description,
    image: image || '',
    owner: req.user._id,
    startingPrice,
    currentPrice: startingPrice,
    startTime: start,
    endTime: end,
    status: 'pending',
    approvedByAdmin: false,
  });

  return sendResponse(res, 201, 'Auction created and pending admin approval', auction);
});

// @route   GET /api/auctions
// @access  Public
const getAuctions = asyncHandler(async (req, res) => {
  // Public listing only ever shows auctions that are live or have finished
  // being live — never pending/rejected ones still awaiting moderation.
  const auctions = await Auction.find({ status: { $in: ['active', 'closed'] } })
    .populate('owner', 'name email')
    .populate('winner', 'name email')
    .sort({ createdAt: -1 });

  return sendResponse(res, 200, 'Auctions fetched successfully', auctions);
});

// @route   GET /api/auctions/:id
// @access  Public
const getAuctionById = asyncHandler(async (req, res) => {
  const auction = await Auction.findById(req.params.id)
    .populate('owner', 'name email')
    .populate('winner', 'name email');

  if (!auction) {
    throw new ApiError(404, 'Auction not found');
  }

  const bids = await Bid.find({ auction: auction._id })
    .populate('bidder', 'name email')
    .sort({ amount: -1 });

  return sendResponse(res, 200, 'Auction fetched successfully', { auction, bids });
});

// @route   GET /api/auctions/my
// @access  Private
const getMyAuctions = asyncHandler(async (req, res) => {
  const auctions = await Auction.find({ owner: req.user._id })
    .populate('winner', 'name email')
    .sort({ createdAt: -1 });

  return sendResponse(res, 200, 'Your auctions fetched successfully', auctions);
});

// @route   PATCH /api/auctions/:id/close
// @access  Private (owner or admin)
const closeAuction = asyncHandler(async (req, res) => {
  const auction = await Auction.findById(req.params.id);

  if (!auction) {
    throw new ApiError(404, 'Auction not found');
  }

  const isOwner = auction.owner.toString() === req.user._id.toString();
  const isAdminUser = req.user.role === 'admin';

  if (!isOwner && !isAdminUser) {
    throw new ApiError(403, 'Only the auction owner or an admin can close this auction');
  }

  if (auction.status === 'closed') {
    throw new ApiError(400, 'Auction is already closed');
  }

  if (auction.status !== 'active') {
    throw new ApiError(400, 'Only active auctions can be closed');
  }

  // Highest amount first, so [0] is the winning bid (if any exist).
  const topBid = await Bid.findOne({ auction: auction._id }).sort({ amount: -1 });

  auction.status = 'closed';
  auction.winner = topBid ? topBid.bidder : null;
  if (topBid) {
    auction.currentPrice = topBid.amount;
  }

  await auction.save();

  const populatedAuction = await auction.populate([
    { path: 'owner', select: 'name email' },
    { path: 'winner', select: 'name email' },
  ]);

  return sendResponse(res, 200, 'Auction closed successfully', populatedAuction);
});

module.exports = {
  createAuction,
  getAuctions,
  getAuctionById,
  getMyAuctions,
  closeAuction,
};
