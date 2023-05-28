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

  update = async (body, companyId) => {
    const { name, document, city, coordinatesX, coordinatesY, informations } =
      body;

    if (!name && !document && !city && !coordinatesX && !coordinatesY)
      throw new Error("Envie um ou mais campos para atualização.");

    const company = await companyRepository.getById(companyId);

    if (company.id != companyId)
      throw new Error("Você não pode atualizar os dados dessa empresa.");

    await companyRepository.updateComapny(companyId, body);

    return { message: "Dados da empresa atualizados com sucesso." };
  };

  excludes = async (companyId) => {
    const company = await companyRepository.getById(companyId);

    if (company.id != companyId)
      throw new Error("Você não pode deletar os dados dessa empresa.");

    await companyRepository.deleteCompany(companyId);

    return { message: "Empresa deletada com sucesso." };
  };
}

export default CompanyService;
