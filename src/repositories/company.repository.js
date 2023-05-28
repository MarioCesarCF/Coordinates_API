import Company from "../models/Companies.js";

class CompanyRepository {
  createCompany = (company) => Company.create(company);
  getAll = () => Company.find();
  getByName = ({ name }) => Company.find({ name });
  getByCnpjCpf = ({ cnpj_cpf }) => Company.find({ cnpj_cpf });
  getByCity = ({ city }) => Company.find({ city });
  updateComapny = (id, body) => Company.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { returnNewDocument: true });
  deleteCompany = (id) => Company.findByIdAndDelete(id);
}

export default CompanyRepository;
