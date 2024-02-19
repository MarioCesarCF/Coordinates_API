import CompanyRepository from "../repositories/company.repository.js";
import UserRepository from "../repositories/user.repository.js";

const companyRepository = new CompanyRepository();
const userRepository = new UserRepository();

class CompanyService {
  create = async (body) => {
    const {
      name,
      document,
      city,
      coordinatesX,
      coordinatesY,
      number_processo,
      informations,
    } = body;

    if (!name || !document || !city || !coordinatesX || !coordinatesY)
      throw { status: 400, message: "Nome, CNPJ/CPF, Cidade e Coordenadas são obrigatórios." };

    const documentIsNaN = isNaN(document);

    if ((document.length !== 11 && document.length !== 14) || documentIsNaN)
      throw { status: 400, message: "Informe um número de documento válido. Informe apenas números." };

    const user = await userRepository.findByIdRepository(body.user);

    if (!user) {
      throw { status: 404, message: "Usuário não encontrado." };
    }

    body.user = user;

    await companyRepository.createCompany(body);

    return {
      status: 201,
      message: "Cliente cadastrado com sucesso.",
      company: {
        name,
        document,
        city,
        coordinatesX,
        coordinatesY,
        number_processo,
        informations,
      },
    };
  };

  showAllCompany = async (name, document, city) => {
    let query = {};
  
    if (name) query.name = name;
    if (document) query.document = document;
    if (city) query.city = city;

    const companiesList = await companyRepository.getAllCompanies(query);
    
    if (companiesList.length === 0)
      throw new Error("Não há clientes cadastrados.");

    const pageData = {
      results: companiesList.map((item) => ({
        id: item._id,
        name: item.name,
        document: item.document,
        city: item.city,
        coordinatesX: item.coordinatesX,
        coordinatesY: item.coordinatesY,
        number_processo: item.number_processo,
        informations: item.informations,
        nameUser: item.user.name,
      })),
    };

    return pageData;
  };

  findById = async (nameParam) => {
    const companyId = nameParam;

    const company = await companyRepository.getById(companyId);

    if (company.length === 0) {
      throw new Error("Empresa não encontrada.");
    }

    return company;
  };  

  findByName = async (nameParam) => {
    const name = nameParam;

    const company = await companyRepository.getByName({ name: name });

    if (company.length === 0) {
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

    if (company.length === 0) {
      throw new Error("Empresa com este CNPJ/CPF não encontrada.");
    }

    return company;
  };

  findByCity = async (cityParam) => {
    const city = cityParam;

    const company = await companyRepository.getByCity({ city: city });

    if (company.length === 0) {
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

  findByNameClient = async (nameParam) => {
    const name = nameParam;

    const company = await companyRepository.getByNameClient({ name: name });

    if (company.length === 0) {
      throw new Error("Empresa com este nome não encontrada.");
    }

    return company;
  };
}

export default CompanyService;
