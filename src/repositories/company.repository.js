import Company from "../models/Companies.js";

class CompanyRepository {
  createCompany = (company) => Company.create(company);

  getAllCompanies = (query) =>
    Company.find(query).populate("user");

  countCompanies = () => Company.countDocuments();

  getByName = ({ name }) => Company.find({ $text: { $search: `\"${name}"` } });

  getByDocument = ({ document }) => Company.find({ document: document });

  getByCity = ({ city }) => Company.find({ $text: { $search: `\"${city}"` } });

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
