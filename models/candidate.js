const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;

//candidate schema
const candidateSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
      unique : true,
      dropDups: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
        unique : true,
        dropDups: true
      },
    score: {
        type: ObjectId,
        ref: "Score",
       
    },
    

}, {timestamps: true});  

module.exports = mongoose.model("Candidate", candidateSchema);