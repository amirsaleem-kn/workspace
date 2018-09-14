const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = require('./lib/app');

require('./lib/models'); // import all models from index.js
require('./public/routes');

// connect to mongoDB
mongoose.connect(keys.mongoURI).then(connection => {
    console.log(`Mongoose connected:`);
}).catch(err => {
    console.log(`Connection error while connecting to mongoDB: ${err}`);
});

const PORT = process.env.PORT || 5000;

app.get('/', ( req, res ) => {
    res.send('<h1>Welcome to your workspace</h1>');
});

// start the server
app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
});