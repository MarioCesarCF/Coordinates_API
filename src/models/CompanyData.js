const mongoose = require('mongoose');

const CompanyDataSchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  city: String,
  coordenatesX: Number,
  coordenatesY: Number,
  informations: String,
});

module.exports = mongoose.model('Companies', CompanyDataSchema);