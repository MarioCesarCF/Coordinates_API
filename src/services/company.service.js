import CompanyRepository from "../repositories/company.repository.js";

const companyRepository = new CompanyRepository();

class CompanyService {
  create = async (body) => {
    const { name, document, city, coordinatesX, coordinatesY, informations } =
      body;

    if (!name || !document || !city || !coordinatesX || !coordinatesY)
      throw new Error("Nome, CNPJ/CPF, Cidade e Coordenadas são obrigatórios.");

    const documentIsNaN = isNaN(document);

    if ((document.length !== 11 && document.length !== 14) || documentIsNaN)
      throw new Error(
        "Informe um número de documento válido. Informe apenas números."
      );

    const company = await companyRepository.createCompany(body);

    return {
      message: "Cliente cadastrado com sucesso.",
      company: {
        name,
        document,
        city,
        coordinatesX,
        coordinatesY,
        informations,
      },
    };
  };

  showAllCompany = async () => {
    const companiesList = await companyRepository.getAllCompanies();

    if (companiesList.length === 0)
      throw new Error("Não há clientes cadastrados.");

    return companiesList;
  };

  findByName = async (nameParam) => {
    const name = nameParam;

    const company = await companyRepository.getByName({ name: name });

    if (company === []) {
      throw new Error("Empresa com este nome não encontrada.");
    }

    return company;
  };

  findByDoc = async (docParam) => {
    const document = docParam;

    const documentIsNaN = isNaN(document);

    if ((document.length !== 11 && document.length !== 14) || documentIsNaN)
      throw new Error(
        "Informe um número de documento válido. Informe apenas números."
      );

    const company = await companyRepository.getByDocument({
      document: document,
    });

    if (company === []) {
      throw new Error("Empresa com este CNPJ/CPF não encontrada.");
    }

    return company;
  };

  findByCity = async (cityParam) => {
    const city = cityParam;

    const company = await companyRepository.getByCity({ city: city });

    if (company === []) {
      throw new Error("Nenhuma empresa encontrada nesta cidade.");
    }

    return company;
  };

  //parei aqui
  updateService = async (body, companyId) => {};

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

export default CompanyService;
