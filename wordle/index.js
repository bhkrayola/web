const express = require("express");
const app = express();
app.set('view engine','ejs')

app.use(express.static("static"));
app.use(express.json()); 

const fs = require('fs');		// fs is built-in. no npm install
const path = require('path');	// path is built-in. no npm install

// generate a file path (as a string) for the words file
const wordsFilePath = path.join(__dirname,'enable1.txt')

// use fs to read the file; convert bytes to string split on newlines
const words = fs.readFileSync(wordsFilePath).toString().split('\n')

// (words is now an array of the entire enable1.txt file)

app.get('/', (req,res) => {
	res.redirect('home')
})

app.get('/home', (req,res) => {
  
  res.render('home')
})

app.post('/wordfinder', (req, res) => {
    let word = req.body.word;
	let regex = new RegExp('^' + word + '$', 'i');
    let filteredWords = words.filter(word => regex.test(word));
	string = "No matching words."
    if (filteredWords.length === 0) {
        res.json([string]);
    } else {
        res.json(filteredWords);
    }
});

const listener = app.listen(
	process.env.PORT || 8080, 
	process.env.HOST || "0.0.0.0", 
	function() {
    	console.log("Express server started");
	}
);