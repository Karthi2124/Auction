const express = require("express");
const router = express.Router();
const Auction = require("../models/Auction");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.post("/create", auth, upload.single("logo"), async (req, res) => {
  try {

    const {
      auctionName,
      sportType,
      auctionDate,
      auctionTime,
      season,
      pointsPerTeam,
      baseBid,
      bidIncreaseBy,
      minPlayers,
      maxPlayers
    } = req.body;

    if (!auctionName || !sportType || !auctionDate || !auctionTime || !season || !baseBid || !bidIncreaseBy) {
      return res.status(400).json({ msg: "All required fields missing" });
    }

    const auction = new Auction({
      auctionName,
      sportType,
      auctionDate,
      auctionTime,
      season,
      pointsPerTeam,
      baseBid,
      bidIncreaseBy,
      minPlayers,
      maxPlayers,
      logo: req.file ? req.file.filename : null,
      createdBy: req.user.id
    });

    await auction.save();

    res.json({
      success: true,
      msg: "Auction created successfully",
      auction
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
