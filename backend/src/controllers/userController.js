const asyncHandler = require('../utils/asyncHandler');
const sendResponse = require('../utils/sendResponse');

// @route   GET /api/users/me
// @access  Private
const getMyProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  return sendResponse(res, 200, 'Profile fetched successfully', {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  });
});

module.exports = { getMyProfile };
