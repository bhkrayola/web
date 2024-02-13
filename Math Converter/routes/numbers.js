const express = require("express");

const numbers = express.Router();

numbers.use(express.json());
numbers.use(express.urlencoded({ extended: true }));

numbers.get('/', function(req,res){
    res.render('main');
});

numbers.get('/converter', function(req,res){
    const { num } = req.query
    const url = '/number/'+num
    res.redirect(url)
});

numbers.get('/number/:num', function(req,res){
    const { num } = req.params
    const { format } = req.query;

    let even = num%2
    let question = 'No!!!!'
    if(even == 0){
        question = 'Yes!!!!'
    }

    let addition = parseInt(num) +  50 

    let subtraction = num - 50

    const render_dictionary = {
      'number' : num,
      'question' : question,
      'addition' : addition,
      'subtraction' : subtraction

    }
    if (format === 'json') {
        res.json(render_dictionary);
    } else {
        res.render('results', render_dictionary);
    }
});


module.exports = numbers