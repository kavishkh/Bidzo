/**
 * Sends a consistently-shaped success response.
 *   { success: true, message: "...", data: {} }
 */
const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

module.exports = sendResponse;
