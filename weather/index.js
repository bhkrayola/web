#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
let https = require('https')

app.get('/', function(req,res){
    res.render('form')
});


app.post('/form_handler', function(req,res,next){
  const {long} = req.body
  const {lat} = req.body
  const maxDecimalDigits = 4;
  const roundedLong = Math.round(long * Math.pow(10, maxDecimalDigits)) / Math.pow(10, maxDecimalDigits);
  const roundedLat = Math.round(lat * Math.pow(10, maxDecimalDigits)) / Math.pow(10, maxDecimalDigits);
  const url = "https://api.weather.gov/points/"+roundedLat+","+roundedLong
  const headers = {
    'User-Agent': 'john cena',
  };
  console.log(url)
  https.get(url, {headers}, (response) => {
  let aggregatedResponseString = '';

  response.on('data', (chunk) => {
      aggregatedResponseString += chunk;
  });
  response.on('end', () => {
      let data = JSON.parse(aggregatedResponseString)
      if (data.type == 'https://api.weather.gov/problems/InvalidPoint' || data.type == 'https://api.weather.gov/problems/InvalidParameter' || data.type == 'https://api.weather.gov/problems/NotFound'){
        res.render('error')
        return 
      }
      console.log(data)
      res.locals.forecast = data.properties.forecast
      console.log(res.locals.forecast)
      next();
      // proceed from here
  });
  });
  });
app.use('/form_handler', function (req, res, next) {
  const headers = {
    'User-Agent': 'john cena',
  };
  https.get(res.locals.forecast, {headers}, (response) => {
    console.log("hi")
    let aggregatedResponseString = '';
  
    response.on('data', (chunk) => {
      aggregatedResponseString += chunk;
    });
  
    response.on('end', () => {
      let data = JSON.parse(aggregatedResponseString)
      const forecast = data.properties.periods
      console.log(forecast)
      // proceed from here
      res.render('home', {forecast});
    });
  });
});


// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});