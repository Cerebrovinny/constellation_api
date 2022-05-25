require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Constellation = require('./models/Constellation');

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
app.use(
    express.urlencoded({
        extend: true,
    }),
)

app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.json({ success: true })
});

app.post('/constellation', async (req, res) => {

    const {name, abbreviation, coordinates} = req.body;

    const constellation = {
        name,
        abbreviation,
        coordinates
    };

    if(!name || !abbreviation || !coordinates) {
        res.status(422).json({ error: `name, abbreviation, coordinates are required` });
    }

    try {
        await Constellation.create(constellation);

        res.status(201).json({message: 'success inserted constellation'})
    } catch (error) {
        res.status(500).json({error: error})
    }
})