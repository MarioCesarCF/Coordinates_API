import CompanyService from "../services/company.service.js";

const companyService = new CompanyService();

class CompanyController {
  createCompany = async (req, res) => {
    const body = req.body;
    body.user = req.userId;

    try {
      const company = await companyService.create(body);

      return res.status(201).send(company);
    } catch (err) {
      if (err.status && err.message) {
        return res.status(err.status).send({ message: err.message });
      } else {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
      }
    }
  };

  showCompanies = async (req, res) => {
    try {
      const { name, document, city } = req.query;
      const companies = await companyService.showAllCompany(name, document, city);

      return res.status(200).send(companies);
    } catch (err) {
      if (err.status && err.message) {
        return res.status(err.status).send({ message: err.message });
      } else {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
      }
    }
  };

  findCompany = async (req, res) => {
    const { id: companyId } = req.params;
    try {
      const company = await companyService.findById(companyId);

      return res.status(200).send(company);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
  updateCompany = async (req, res) => {
    const body = req.body;
    const { id: companyId } = req.params;

    try {
      const response = await companyService.update(body, companyId);

      return res.send(response);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };

  deleteCompany = async (req, res) => {
    const companyId = req.params.id;

    console.log(companyId);
    try {
      const company = await companyService.excludes(companyId);

      return res.send(company);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };

  findByNameClient = async (req, res) => {
    const { name } = req.params;
    try {
      const company = await companyService.findByNameClient(name);

      return res.status(200).send(company);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default CompanyController;
