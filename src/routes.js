const express = require('express');
const routes = express.Router();

const CompanyController = require('./controllers/CompanyController');

routes.get('/companies', CompanyController.create);

module.exports = routes;