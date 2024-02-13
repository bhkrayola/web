#!/usr/bin/nodejs

const express = require('express')
const app = express()

let heros = {
  heros : [
      {
        id : 0,
        name : "Archibald",
        wit : 0,
        strength : 7,
        attack : 5,
        defense : 1,
        magic : 0
      }, {
        id : 1,
        name : "Henrik",
        wit : 4,
        strength : 3,
        attack : 3,
        defense : 1,
        magic : 2
      }, {
        id : 2,
        name : "Isadore",
        wit : 2,
        strength : 6,
        attack : 4,
        defense : 0,
        magic : 4
      }, {
        id : 3,
        name : "Lucinda",
        wit : 4,
        strength : 3,
        attack : 1,
        defense : 8,
        magic : 1
      }, {
        id : 4,
        name : "Harold",
        wit : 5,
        strength : 2,
        attack : 3,
        defense : 3,
        magic : 2
      }
  ]
}

app.get('/update_attack', (req,res) => {
  const {id, attack}  = req.query

  console.log(id)
  console.log(attack)
  try {
      heros.heros[id].attack = Number(attack)
      const response = { 'ok' : true }
      res.json(response)
  } catch {
    const response = { 'ok' : false }
    res.json(response)
  }

})

app.get('/heroes_json', (req,res) => { //heros is not the correct spelling Mr Kosek! its heroes!!!
  res.json(heros)
})

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});

let http = require('http')
function readNewPromise(url){
  return new Promise((resolve) => {
    http.get(url, (response) => {
      let aggregatedResponseString = '';
    
      response.on('data', (chunk) => {
          aggregatedResponseString += chunk;
      });
      response.on('end', () => {
          let data = JSON.parse(aggregatedResponseString)
          resolve(data)
      });
    });
  });
}

const fs = require('fs');
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

async function main(url, filename) {
    try {
      const data = await readNewPromise(url);
      await writeThePromise(filename, data);
      console.log('Data downloaded and saved to file successfully.');
    } catch (error) {
      console.error('Error:', error);
    }
  }

main('http://localhost:8080/heroes_json', 'info.txt')