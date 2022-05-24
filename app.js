const express = require('express');

const app = express();

//routes
app.get('/', (req, res) => {
    res.send("working");
});

//listening
app.listen(3000);