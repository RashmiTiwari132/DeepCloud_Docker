// https://blog.jscrambler.com/implementing-jwt-using-passport/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var Account = require('./models/account');
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var tokenStrategy = passportJWT.Strategy;
var localStrategy = require('passport-local').Strategy;
var params = {
	secretOrKey: cfg.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeader()
};

module.exports = function() {
	var strategy1 = new localStrategy(Account.authenticate());

	var strategy2 = new tokenStrategy(params, function(payload,done) {
		Account.findOne({username: payload.username}, function(err,username) {
			if(err) {
				return done(err,false);
			}
			else if(username) {
				done(null,username);
			}
			else {
				done(null,false);
			}
		});
	});
	
	passport.use(strategy1);
	passport.use(strategy2);
	passport.serializeUser(Account.serializeUser());
	passport.deserializeUser(Account.deserializeUser());


	return {
		initialize: function() {
			return passport.initialize();		   	
		},
		authenticateToken: function() {
			return passport.authenticate("jwt",cfg.jwtSession);
		},
		authenticateLocal: function() {
			return passport.authenticate("local");				   
		}
	}
}
