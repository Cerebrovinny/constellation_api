require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@constellationdb.vvc62.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('mongodb connect success');
        //listening
        app.listen(3000);
    })
    .catch((err) => console.log(err))

//middlewares
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.json({ success: true })
});

const constellationRoutes = require('./routes/constellationRoutes')

app.use('/constellation', constellationRoutes)