const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./lib/models'); // import all models from index.js

const app = express();

// connect to mongoDB
mongoose.connect(keys.mongoURI);

app.use(passport.initialize());

const PORT = process.env.PORT || 5000;

app.get('/', ( req, res ) => {
    res.send('<h1>Welcome to your workspace</h1>');
});

// start the server
app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
});