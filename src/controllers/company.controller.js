import {
  createCompany,
  getAll,
  getByCity,
  getByCnpjCpf,
  getByName,
  deleteCompany,
} from "../services/company.service.js";

export const show = async (req, res) => {
  try {
    const companiesList = await getAll();
    return res.status(200).json({ data: companiesList, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const { name, cnpj_cpf, city, coordinatesX, coordinatesY, informations } =
      req.body;

    if (!name || !cnpj_cpf || !city || !coordinatesX || !coordinatesY) {
      return res
        .status(400)
        .json({ error: "Nome, CNPJ/CPF, Cidade e Coordenadas são obrigatórios." });
    }

    if (cnpj_cpf.length !== 11 && cnpj_cpf.length !== 14) {
      return res.status(400).json({
        error: "Informe um número de documento válido. Informe apenas números.",
      });
    }

    const company = await createCompany({
      name,
      cnpj_cpf,
      city,
      coordinatesX,
      coordinatesY,
      informations,
    });

    res.status(201).send(company);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const excludes = async (req, res) => {
  try {
    const { id } = req.params;

    const companyDeleted = await deleteCompany(id);

    if (companyDeleted) {
      return res.status(200).json({ data: companyDeleted, status: "Success" });
    }

    return res
      .status(401)
      .json({ error: "Não foi encontrado o registro para deletar." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findByName = async (req, res) => {
  try {
    const { name } = req.params;

    const companyName = await getByName({ name: name });

    if (companyName) {
      return res.status(200).json({ data: companyName, status: "Success" });
    }

    return res
      .status(401)
      .json({ error: "Empresa com este nome não encontrada." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findByCnpjCpf = async (req, res) => {
  try {
    const { cnpj_cpf } = req.params;
    if (cnpj_cpf.length !== 11 && cnpj_cpf.length !== 14) {
      return res
        .status(401)
        .json({ error: "Informe um número de CNPJ/CPF válido (Apenas números)." });
    }

    const companyCnpj = await getByCnpjCpf({ cnpj_cpf: cnpj_cpf });
   
    if (companyCnpj === []) {
      return res
      .status(401)
      .json({ error: "Empresa com este CNPJ/CPF não encontrada." });
    }
    else if (companyCnpj) {
      return res.status(200).json({ data: companyCnpj, status: "Success" });
    }

    return res
      .status(401)
      .json({ error: "Empresa com este CNPJ/CPF não encontrada." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const companyCity = await getByCity({ city: city });

    if (companyCity) {
      return res.status(200).json({ data: companyCity, status: "Success" });
    }

    return res
      .status(401)
      .json({ error: "Empresa não encontrada na cidade informada." });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default { show, create, excludes, findByName, findByCnpjCpf, findByCity };