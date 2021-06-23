var express = require("express");
var router = express.Router();

const {insertCandidate} = require('../controllers/candidate')


//POST route to insert candidate 

router.post('/insert_candidate',  insertCandidate)


module.exports = router;