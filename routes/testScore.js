var express = require("express");
var router = express.Router();

const {saveScoreToCandidateByName, highestScore, avgMarksByEachCandidate} = require('../controllers/testScore')

//POST route to insert candidate scores by name
router.post('/save_score_by_candidate_name',  saveScoreToCandidateByName)

//GET route to get highest scoring candidate data and avg marks of each round performed by all candidate 
router.get('/highestscoring_candidate_and_avgmarks_eachround_byallcandidate', highestScore)


//GET route to get vag marks of all candidates
router.get('/candidates_avgandtotal_score', avgMarksByEachCandidate)




module.exports = router;

