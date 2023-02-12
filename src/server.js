const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();
require('./config/dbConfig');

app.use(express.json());
app.use(routes);

//port padrão
const port = process.env.PORT || 27017;

app.listen(port, () => {console.log(`App listen port ${port}`)})

