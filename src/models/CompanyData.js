const mongoose = require('mongoose');

const CompanyDataSchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  city: String,
  coordinatesX: Number,
  coordinatesY: Number,
  informations: String,
});

module.exports = mongoose.model('Companies', CompanyDataSchema);