const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig = process.env.DATABASE_URL;

mongoose.set('strictQuery', true);

const connection = mongoose.connect(dbConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = connection;