const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('<h1>Welcome to your workspace</h1>');
})

app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
});