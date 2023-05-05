import Company from "../models/Companies.js";

export const createCompany = async (company) => {
  return await Company.create(company);
};

export const getAll = async () => {
  return await Company.find();
};

export const getByName = async ({ name }) => {
  return await Company.find({ name });
};

export const getByCnpjCpf = async ({ cnpj_cpf }) => {
  return await Company.find({ cnpj_cpf });
};

export const getByCity = async ({ city }) => {
  return await Company.find({ city });
};

export const deleteCompany = async (id) => {
  return await Company.findByIdAndDelete(id);
};

