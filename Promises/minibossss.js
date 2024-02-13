#!/usr/bin/nodejs

const express = require('express')
const app = express()
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
const fs = require('fs');

let heroes = {}

function getTheHeroes(){
  return new Promise((resolve) => {
    fs.readFile('static/info.json', (err, data) => {
      if (err) {
        reject(err)
      } else {
        heroes = JSON.parse(data)
        resolve('Heroes loaded successfully')
      }
    })
  })
}

function writeThePromise(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('File written successfully');
      }
    });
  });
}

app.get('/update_attack', (req,res) => {
  const {id, attack}  = req.query

  console.log('You are updating the id: '+id)
  console.log('You are updating their attack to: '+attack)
  try {
      heroes.heros[id].attack = Number(attack)
      const response = { 'ok' : true }
      res.json(response)
  } catch {
    const response = { 'ok' : false }
    res.json(response)
  }
  writeThePromise('static/info.json', heroes)
  console.log('Stats updated successfully')
})

app.get('/heroes_json', (req,res) => { //heros is not the correct spelling Mr Kosek! its heroes!!!
  res.json(heroes)
})

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
    getTheHeroes(); console.log('Heroes loaded successfully')
    console.log("Example stats usage: http://localhost:8080/update_attack?id=0&attack=999")
});

//Brian Ho, Kosek Period 1, 2023
//nodejs promises