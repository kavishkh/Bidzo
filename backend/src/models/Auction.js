const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      default: '',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    startingPrice: {
      type: Number,
      required: [true, 'Starting price is required'],
      min: 0,
    },
    currentPrice: {
      type: Number,
      default: function () {
        return this.startingPrice;
      },
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'closed', 'rejected'],
      default: 'pending',
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Speed up the common "browse active auctions" query.
auctionSchema.index({ status: 1 });
auctionSchema.index({ owner: 1 });

module.exports = mongoose.model('Auction', auctionSchema);
