#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var app = express();
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req,res){
    const {name} = req.query
    let result = false
    if(name != undefined){
        result = true
    }
    const render_dictionary = {
        'has_format' : result
    }
    res.render('home', render_dictionary);
});

app.post('/form_handler', function(req,res){
    let result = false
    if('name' in req.body && req.body.name != ""){
        result = true
    }
    const render_dictionary = {
        'has_format' : result
    }
    res.render('form_results', render_dictionary);
});

// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});