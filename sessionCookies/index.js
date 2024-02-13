#!/usr/bin/nodejs

var express = require('express')
var app = express();
app.set('view engine','ejs')
var cookieSession = require('cookie-session')
const cookieInitializationParams = {
	name: 'views',
	keys: ['encryptionkey'],
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }

const cookieSessionMiddleware = cookieSession(cookieInitializationParams)
app.use(cookieSessionMiddleware)

const visitCounterMiddleware = (req,res,next) => {
	let {visits,authenticated,login} = req.session;
	//visits ||= 0;
	//authenticated ||= false;
	if(!visits){ visits = 0 }
	if(!authenticated){authenticated = false}
	if(!login){login = false}
	req.session.visits = visits;
	req.session.authenticated = authenticated;
	req.session.login = login;
	next()
}

app.get('/', visitCounterMiddleware, (req,res) =>{
	res.redirect('cookiepage')
})

app.get('/login', visitCounterMiddleware, (req,res) =>{

	req.session.login = true; 
	console.log(req.session.login)
	res.redirect('cookiepage')
})


app.get('/logout', visitCounterMiddleware, (req,res) =>{

	req.session.login = false; 
	console.log(req.session.login)
	res.redirect('cookiepage')
})

app.get('/cookiepage', visitCounterMiddleware, (req,res) =>{

	req.session.visits +=1; 
	console.log(req.session.visits)
	console.log(req.session.login)
	if ((req.session.visits > 5) && (req.session.visits === false)){
		let message = "you've visited too many times!"
		res.render("blocked.ejs", message={message})
	}
	else{
		res.render("main.ejs")
	}

})
// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
