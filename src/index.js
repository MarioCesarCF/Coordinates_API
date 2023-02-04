const express = require('express');
const routes = require('./routes');

const app = express();
require('./config/dbConfig');

app.use(express.json());
app.use(routes);

app.listen(3000, () => { console.log('Listen port 3000') });