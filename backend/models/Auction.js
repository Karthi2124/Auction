const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  auctionName: {
    type: String,
    required: true
  },
  sportType: {
    type: String,
    required: true
  },
  auctionDate: {
    type: String,
    required: true
  },
  auctionTime: {
    type: String,
    required: true
  },
  season: {
    type: String,
    required: true
  },
  pointsPerTeam: {
    type: Number,
    default: 100
  },
  baseBid: {
    type: Number,
    required: true
  },
  bidIncreaseBy: {
    type: Number,
    required: true
  },
  minPlayers: {
    type: Number,
    default: 11
  },
  maxPlayers: {
    type: Number,
    default: 15
  },
  logo: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Auction", auctionSchema);
