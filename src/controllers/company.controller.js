import CompanyService from "../services/company.service.js";

const companyService = new CompanyService();

class CompanyController {
  createCompany = async (req, res) => {
    const body = req.body;
    try {
      const company = await companyService.create(body);

      return res.status(201).send(company);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  showCompanies = async (req, res) => {
    try {
      const companies = await companyService.showAllCompany();

      return res.status(200).send(companies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  findByName = async (req, res) => {
    const { name } = req.params;
    try {
      const company = await companyService.findByName(name);

      return res.status(200).send(company);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  findByCnpjCpf = async (req, res) => {
    const { document } = req.params;
    try {
      const company = await companyService.findByDoc(document);

      return res.status(200).send(company);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  findByCity = async (req, res) => {
    const { city } = req.params;
    try {
      const company = await companyService.findByCity(city);

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
    const { id: companyId } = req.params;
    
    try {
      const company = await companyService.excludes(companyId);

      return res.send(company);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };
}

export default CompanyController;
