import {
  createCompany,
  getAll,
  getByCity,
  getByCnpj,
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
    const { name, cnpj, city, coordinatesX, coordinatesY, informations } =
      req.body;

    if (!name || !cnpj || !city || !coordinatesX || !coordinatesY) {
      return res
        .status(400)
        .json({ error: "Nome, CNPJ, Cidade e Coordenadas são obrigatórios." });
    }

    const company = await createCompany({
      name,
      cnpj,
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

export const findByCnpj = async (req, res) => {
  try {
    const { cnpj } = req.params;

    const companyCnpj = await getByCnpj({ cnpj: cnpj });

    if (companyCnpj) {
      return res.status(200).json({ data: companyCnpj, status: "Success" });
    }

    return res
      .status(401)
      .json({ error: "Empresa com este CNPJ não encontrada." });
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
