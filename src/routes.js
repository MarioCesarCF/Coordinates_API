const express = require('express');
const routes = express.Router();

const CompanyController = require('./controllers/CompanyController');

routes.get('/companies', CompanyController.show);
routes.post('/companies', CompanyController.create);
routes.delete('/companies/:id', CompanyController.delete);
routes.get('/companies/name/:name', CompanyController.findByName);
routes.get('/companies/cnpj/:cnpj', CompanyController.findByCnpj);
routes.get('/companies/city/:city', CompanyController.findByCity);

module.exports = routes;