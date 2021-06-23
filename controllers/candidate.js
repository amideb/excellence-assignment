const Candidate = require("../models/candidate");


//insert candidate 

exports.insertCandidate = (req, res) => {
  const candidate = new Candidate(req.body);

  candidate.save((err, candidate) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }

    res.json({
      name: candidate.name,
      email: candidate.email,
      id: candidate._id,
      message:'Candidate Insertion Successful '
    });
  });
};
