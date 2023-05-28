import Company from "../models/Companies.js";

class CompanyRepository {
  createCompany = (company) => Company.create(company);

  getAllCompanies = () => Company.find();

  getByName = ({ name }) => Company.find({ $text: { $search: `\"${name}"` } });

  getByDocument = ({ document }) => Company.find({ document: document });

  getByCity = ({ city }) => Company.find({ $text: { $search: `\"${city}"` } });

  updateComapny = (id, body) =>
    Company.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { returnNewDocument: true }
    );

  deleteCompany = (id) => Company.findByIdAndDelete(id);
}

export default CompanyRepository;
