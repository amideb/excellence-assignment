const mongoose = require("mongoose");

//test_score schema
const scoreSchema = new mongoose.Schema(
  {
    firstRound: {
      type: Number,
      min: 0,
      max: 10,
    },
    secondRound: {
      type: Number,
      min: 0,
      max: 10,
    },
    thirdRound: {
      type: Number,
      min: 0,
      max: 10,
    },
    total: {
      type: Number,
    },
    avg: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", scoreSchema);
