const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports.LighthouseResults = mongoose.model(
  'LighthouseResults', 
  new Schema({
    name: String,
    result: String
  })
)
