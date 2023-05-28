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

  excludes = async (req, res) => {
    try {
      const { id } = req.params;

      const companyDeleted = await deleteCompany(id);

      if (companyDeleted) {
        return res
          .status(200)
          .json({ data: companyDeleted, status: "Success" });
      }

      return res
        .status(401)
        .json({ error: "Não foi encontrado o registro para deletar." });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default CompanyController;
