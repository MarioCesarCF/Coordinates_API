import Company from "../models/Companies.js";

class CompanyRepository {
  createCompany = (company) => Company.create(company);

  getAllCompanies = (query) =>
    Company.find(query).populate("user");

  countCompanies = () => Company.countDocuments();
  
  getById = (id) => Company.findById(id);

  updateComapny = (id, body) =>
    Company.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { returnNewDocument: true }
    );

  deleteCompany = (id) => Company.findByIdAndDelete(id);

  getByNameClient = ({ name }) => Company.find({ name: name });
}

export default CompanyRepository;
