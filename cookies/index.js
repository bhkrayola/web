#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

var express = require('express')
var cookieParser = require('cookie-parser')
var app = express();
app.set('view engine','ejs')
app.use(cookieParser())

app.get('/cookiepage', (req,res) =>{

	let cookie_name = 'dogsorcats'
	let cookie_value = 'dogs'

	let cookie2_name = 'visitCount'
	let cookie2_value = '1'

	if (req.cookies[cookie2_name]) {
        cookie2_value = parseInt(req.cookies[cookie2_name]) + 1;
    }

	res.cookie(cookie_name, cookie_value, {maxAge: 360000})
	res.cookie(cookie2_name, cookie2_value, {maxAge: 360000})
	var cookie = getcookie(req)	
	res.render("main.ejs", {cookie})
})
// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

function getcookie(req){
	var cookie = req.headers.cookie;
	return cookie.split("; ");
}
var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
