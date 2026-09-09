const User = require('../models/User');
const Auction = require('../models/Auction');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const sendResponse = require('../utils/sendResponse');

// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  return sendResponse(res, 200, 'Users fetched successfully', users);
});

// @route   PATCH /api/admin/users/:id/verify
// @access  Private/Admin
const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.isVerified = true;
  await user.save();

  return sendResponse(res, 200, 'User verified successfully', user);
});

// @route   GET /api/admin/auctions/pending
// @access  Private/Admin
const getPendingAuctions = asyncHandler(async (req, res) => {
  const auctions = await Auction.find({ status: 'pending' })
    .populate('owner', 'name email')
    .sort({ createdAt: -1 });

  return sendResponse(res, 200, 'Pending auctions fetched successfully', auctions);
});

// @route   PATCH /api/admin/auctions/:id/approve
// @access  Private/Admin
const approveAuction = asyncHandler(async (req, res) => {
  const auction = await Auction.findById(req.params.id);

  if (!auction) {
    throw new ApiError(404, 'Auction not found');
  }

  if (auction.status !== 'pending') {
    throw new ApiError(400, 'Only pending auctions can be approved');
  }

  auction.approvedByAdmin = true;
  auction.status = 'active';
  await auction.save();

  return sendResponse(res, 200, 'Auction approved and is now active', auction);
});

// @route   PATCH /api/admin/auctions/:id/reject
// @access  Private/Admin
const rejectAuction = asyncHandler(async (req, res) => {
  const auction = await Auction.findById(req.params.id);

  if (!auction) {
    throw new ApiError(404, 'Auction not found');
  }

  if (auction.status !== 'pending') {
    throw new ApiError(400, 'Only pending auctions can be rejected');
  }

  auction.status = 'rejected';
  await auction.save();

  return sendResponse(res, 200, 'Auction rejected', auction);
});

module.exports = {
  getUsers,
  verifyUser,
  getPendingAuctions,
  approveAuction,
  rejectAuction,
};
