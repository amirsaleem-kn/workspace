const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

// import User model from mongoose;

const User = mongoose.model('users');

const keys = require('../../config/keys');

const facebookStrategy = {
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: keys.facebookCallback,
    proxy: true
};

async function facebookStrategyCallback (accessToken, refreshToken, profile, next) {
    console.log(profile);
}

passport.use(new FacebookStrategy(facebookStrategy, facebookStrategyCallback))