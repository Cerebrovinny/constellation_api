//There should be 1 model called “Constellation”. It should have 3 properties: name (string/unique), abbreviation (string) and coordinates (string). All properties are required.
const mongoose = require('mongoose');

const Constellation = mongoose.model('Constellation', {
    name: String,
    abbreviation: String,
    coordinates: String,
});

module.exports = Constellation;