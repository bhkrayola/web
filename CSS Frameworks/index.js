#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

app.get('/', function(req,res){
    res.render('test')
});

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});