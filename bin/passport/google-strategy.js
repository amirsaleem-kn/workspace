const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

// import User model from mongoose;

const User = mongoose.model('users');

const keys = require('../../config/keys');

const googleStrategy = {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    profileFields: [ 'id', 'displayName', 'photos', 'email' ],
    proxy: true
};

async function googleStrategyCallback (accessToken, refreshToken, profile, done) {
    console.log(profile);
}

passport.use(new GoogleStrategy(googleStrategy, googleStrategyCallback));
