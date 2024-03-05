import Company from "../models/Companies.js";

class CompanyRepository {
  createCompany = (company) => Company.create(company);

  getAllCompanies = (query) =>{
    // 'for' usado para buscar por qualquer correspondencia da string passada como query (name, city ou document)
    for (let key in query) {
      if (typeof query[key] === 'string') {
          query[key] = { $regex: query[key], $options: 'i' };
      }
    }
  return Company.find(query).populate("user");
  }
    

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
