//interface of mongodb
const mongoose = require('mongoose');

//movie variable schema
const schemaDefinition = {

    movieName: { type: String, required: true },
  rating: { type: Number, max: 10, required: true },
  summary: { type: String, match: /[a-z]/ },
  releaseDate: { type: Date, default: Date.now },
  
}
//schema obj to export
let schemaObj = new mongoose.Schema(schemaDefinition);


module.exports = mongoose.model('movie', schemaObj);