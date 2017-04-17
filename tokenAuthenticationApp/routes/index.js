var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var path = require('path');
var auth = require('../auth')();
var cfg = require('../config.js');
var jwt = require('jwt-simple');

router.get('/', function(req,res) {
    console.log("Home page requested.");
    res.sendFile(path.join(__dirname, '../webPages/index.html'));
});

router.get('/register', function(req,res) {
    console.log("register page called");
    res.sendFile(path.resolve(__dirname + '/../webPages/register.html'));
});

router.post('/register', function(req,res) {
    console.log("data posted to register : "+req.body.username);
    Account.register(new Account({ username : req.body.username}), req.body.password, function(err, account) {
        if(err) {
            res.send("Register error : "+err);
        }

        //passport.authenticate('local')(req,res,function() {
		auth.authenticateLocal()(req,res,function() {
			res.redirect('/');
        });
    });
});

router.get('/login', function(req,res) {
    console.log("login page requested.");
    res.sendFile(path.resolve(__dirname + '/../webPages/login.html'));
});


//do password authentication and send token
router.post('/login', auth.authenticateLocal(), function(req, res) {
	var payload = {
		username: req.body.username
	};
	var token = jwt.encode(payload,cfg.jwtSecret);
	//console.log("payload : "+payload.username+" "+req.body.username+" , token : "+token);
	res.json({
		token: token
	});
    //res.sendFile(path.resolve(__dirname+ '/../webPages/loggedInIndex.html'));
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req,res) {
    res.status(200).send("pong!");
});

router.get('/pingAuth', auth.authenticateToken(),function(req,res) {
   /* if(req.isAuthenticated()) {
        res.status(200).send("pong authenticated!");
    }
    else {
        res.status(403).send("login first!");
    }*/
	res.status(200).send("pong authenticated!");
});

module.exports = router;
