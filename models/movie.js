
const mongoose = require('mongoose');

const schemaDefinition = {

    movieName: { type: String, required: true },
  rating: { type: Number, max: 10, required: true },
  summary: { type: String, match: /[a-z]/ },
  releaseDate: { type: Date, default: Date.now },
  
}

let schemaObj = new mongoose.Schema(schemaDefinition);


module.exports = mongoose.model('movie', schemaObj);