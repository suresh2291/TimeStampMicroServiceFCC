// server.js
// where your node app starts

// init project
const moment = require('moment');
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// app.get('/now', function(req, res, next){
//   req.time = new Date().toString();
//   next();
// },
//   function(req, res) {
//     res.send({"time": req.time});
//   }       
// );





app.get("/api/timestamp/:date_string?",(req,res,next)=>{
  const dateString = req.params.date_string;

  let date;
  // If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.
  if (!dateString) {
    console.log('new date condition')
    date = moment()
    console.log(moment().format('LLLL'))
  } else {
    // non-empty dateString
    // if datestring is integer, convert dateString to an integer
    if (!isNaN(dateString)) {
      date = moment.unix(dateString).format("LLLL");
    } else {
      date = moment.unix(dateString).format("LLLL");
    }
  }
  // If the date string is invalid the api returns a JSON having the structure  {"error" : "Invalid Date" }.
  if (date.toString() === 'Invalid Date') {
    res.json({ error: date.toString() });
  } else {
    // If the date string is valid the api returns a JSON having the structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> }
    res.json({ unix: moment(date).format('X'), utc: moment(date).format('LLLL')});
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});