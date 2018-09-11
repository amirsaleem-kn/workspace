const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./bin/passport/passport-main');

const app = express();

mongoose.connect(keys.mongoURI);

app.use(passport.initialize());

const PORT = process.env.PORT || 5000;

app.get('/', ( req, res ) => {
    res.send('<h1>Welcome to your workspace</h1>');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
});