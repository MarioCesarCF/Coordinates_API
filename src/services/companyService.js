const Company = require('../models/CompanyData');
const connection = require('../config/dbConfig');

connection();

exports.createCompany = async (company) => {
  return await Company.create(company);
};

exports.getAll = async () => {
  return await Company.find();
};

exports.getByName = async ({ name }) => {
  return await Company.findOne({ name });
};

exports.getByCnpj = async ({ cnpj }) => {
  return await Company.findOne({ cnpj });
};

exports.getByCity = async ({ city }) => {
  return await Company.findOne({ city });
};

exports.deleteCompany = async (id) => {
  return await Company.findByIdAndDelete(id);
};