#!/usr/bin/nodejs

const express = require('express')
const app = express()
const mysql = require('mysql').verbose();
const db = new sqlite3.Database('database.db');
app.set('view engine', 'ejs')

function query_promise(query, params=[]) {
    return new Promise( (resolve,reject) => {
      const fn = (query.split(" ")[0].toUpperCase()==="SELECT") ? 'all' : 'run'
      if (params.length===0) {
        db[fn](query, (err,rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      } else {
        db[fn](query, params, (err,rows) => {
          if (err) reject(err);
          resolve(rows);
        })
      }
    })
  }

function sqlPromise(query) {
    return new Promise( (resolve,reject) => {
        db.all(query, (err,rows) => {
        if (err) reject(err);
        resolve(rows);
        })
    })
  }

app.get('/', async (req,res) => {

    let sqlquery = 'SELECT * FROM characters';
    let results = await sqlPromise(sqlquery);

    let characters = {
        'results' : results
    }
    characters = characters['results']
    res.render('characters', {characters})
})

app.get('/update', async (req,res) => {
  console.log("hi")
  const {id, type, val} = req.query;
  console.log("Type:" +type)
  let thing = ''

  if (type ==1){
    thing = 'c_wit'
  }
  else if (type ==2){
    thing = 'c_attack'
  }
  else if (type ==3){
    thing = 'c_strength'
  }
  else if (type ==4){
    thing = 'c_defense'
  }
  else if (type ==5){
    thing = 'c_magic'
  }
  console.log(thing)
  let params = [thing,id, val];
  console.log(params)

  let query2 = `UPDATE characters SET ${thing}=${val} WHERE c_id=${id}`;
  console.log(query2)
  await sqlPromise(query2);
  console.log(' --- update complete --- ')
  res.redirect('/'+id)
})

app.get('/equip', async (req,res) => {
  console.log("hiiiii")
  const {id, eid} = req.query;
  let params = [id, eid];
  console.log(params+"hi")

  let query2 = `INSERT INTO assignedEquipment (c_id, e_id) VALUES (${id}, ${eid})`;
  console.log(query2)
  await sqlPromise(query2);
  console.log(' --- update complete --- ')
  res.redirect('/'+id)
})

app.get('/quest', async (req,res) => {
  const {id, qid} = req.query;
  let params = [id, qid];
  console.log(params+"hi")

  let query2 = `INSERT INTO assignedQuests (c_id, q_id) VALUES (${id}, ${qid})`;
  console.log(query2)
  await sqlPromise(query2);
  console.log(' --- update complete --- ')
  res.redirect('/'+id)
})

app.get('/:num', async (req,res) => {
    const {num} = req.params;
    console.log(num)
    let sqlquery = 'SELECT * FROM characters WHERE c_id=(?)';

    let results = await query_promise(sqlquery, num);

    let sqlquery2 = 'SELECT * FROM equipment';
    let results2 = await sqlPromise(sqlquery2);

    let sqlquery3 = 'SELECT * FROM quests';
    let results3 = await sqlPromise(sqlquery3);

    let sqlquery4 = 'SELECT equipment.e_id, equipment.e_name FROM equipment INNER JOIN assignedEquipment ON equipment.e_id = assignedEquipment.e_id WHERE assignedEquipment.c_id=(?)';
    let results4 = await query_promise(sqlquery4, num);

    let sqlquery5 = 'SELECT quests.q_id, quests.q_name FROM quests INNER JOIN assignedQuests ON quests.q_id = assignedQuests.q_id WHERE assignedQuests.c_id=(?)';
    let results5 = await query_promise(sqlquery5, num);
    
    let characters = {
      'results' : results
    }

    let equipment = {
      'results' : results2
    }

    let quests = {
      'results' : results3
    }
    let assignedEquipment = {
      'results' : results4
    }
    let assignedQuests = {
      'results' : results5
    }
    characters = characters['results']
    equipment = equipment['results']
    console.log(equipment)
    quests = quests['results']
    assignedEquipment = assignedEquipment['results']
    assignedQuests = assignedQuests['results']
    console.log(assignedEquipment)
    console.log(characters)
    console.log(assignedQuests)
    res.render('display', {characters, equipment, quests, assignedEquipment, assignedQuests})
  })



var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});

//Brian Ho, Kosek Period 1, 2023
//nodejs promises