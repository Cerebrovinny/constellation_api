//There should be 1 model called “Constellation”. It should have 3 properties: name (string/unique), abbreviation (string) and coordinates (string). All properties are required.
const mongoose = require('mongoose');

const Constellation = mongoose.model('Constellation', {
    name: { type: String, required: true, unique: true },
    abbreviation: { type: String, required: true, unique: true },
    coordinates: { type: String, required: true, unique: true },
});

module.exports = Constellation;