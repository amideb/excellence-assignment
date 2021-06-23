const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const Candidate = require("../models/candidate");
const Score = require("../models/testScore");


// save score by candidate name

exports.saveScoreToCandidateByName = (req, res) => {
  

  const sumVal =
    req.body.firstRound + req.body.secondRound + req.body.thirdRound;
  const avgVal = (sumVal / 3).toFixed(2);

  const dumpScore = {
    firstRound: req.body.firstRound,
    secondRound: req.body.secondRound,
    thirdRound: req.body.thirdRound,
    total: sumVal,
    avg: avgVal,
  };

  const score = new Score(dumpScore);

  
  newName = req.body.name;
  const id = score._id;
  

  Candidate.findOneAndUpdate(
    { name: newName },
    { $set: { score: id } },
    { new: true },
    (err, updatedData) => {
      if (err) {
        console.log(err);
      } else {
        
        console.log("Students text score added");
      }
    }
  );

  score.save((err, score) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save score in DB",
      });
    }
    res.json({
      firstRound: score.firstRound,
      secondRound: score.secondRound,
      thirdRound: score.thirdRound,
      id: score._id,
      message: `Test Score Updated for Candidate ${req.body.name}`,
    });
  });
};


// get highest scoring candidate and avg marks of all round performed  by all candidates
exports.highestScore = (req, res) => {
  Score.find({})
    .sort({
      total: -1,
    })
    .limit()
    .then((val, err) => {
      if (err) {
        console.log(err);
      } else {
        var idCandidate = new ObjectId(val[0]._id.toString());

        // console.log(val);

        Array.prototype.sum = function (prop) {
          var total = 0;
          for (var i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop];
          }
          return (total / this.length).toFixed(2);
        };

        //console.log(val.sum("firstRound"))
        // console.log(val.sum("secondRound"))
        // console.log(val.sum("thirdRound"))

        Candidate.find({ score: idCandidate }, (error, data) => {
          if (error) {
            console.log(error);
          } else {

            res.json({
              highest_scoring_candidate: {
                id: data[0]._id,
                name: data[0].name,
                email: data[0].email,
                firstRound: val[0].firstRound,
                secondRound: val[0].secondRound,
                thirdRound: val[0].thirdRound,
                total: val[0].total,
                avg: val[0].avg,
                message: `Congratulations! ${data[0].name}`,
              },
             
              avg_score_by_allcandidates: {
                firstRound: val.sum("firstRound"),
                secondRound: val.sum("secondRound"),
                thirdRound: val.sum("thirdRound"),
              },
            });
          }
        });
      }
    });
};


//get avg and total marks of all candidates

exports.avgMarksByEachCandidate = async (req, res) => {
  try {
    const arr = [];

    const scores = await Score.find({}).sort({ total: -1 });
    for (const score of scores) {
      const oid = new ObjectId(score._id.toString());
      const candidate = await Candidate.findOne({ score: oid });
      if (!candidate) continue;
      const obj = {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        total_marks: score.total,
        avg_marks: score.avg,
      };
      arr.push(obj);
    }

    return res.json(arr);
  } catch (error) {
    console.log(error);
  }
};
