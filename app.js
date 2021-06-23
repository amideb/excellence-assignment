require("dotenv").config();

const mongoose = require("mongoose");
const express = require('express')
const app = express()
const bodyParser = require("body-parser");

const candidateRoute = require('./routes/candidate')
const scoreRoute = require('./routes/testScore')

app.use(bodyParser.json());

//DB  Connection

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("ERROR: DB NOT CONNECTED");
  });


//Routes

app.get('/', (req, res) => {
  res.send('EXCELLENCE ASSIGNMENT!')
})


app.use('/api', candidateRoute)
app.use('/api', scoreRoute)

//PORT

const port = process.env.PORT || 8000;

//Starting a Server

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});