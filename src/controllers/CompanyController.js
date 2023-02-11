const CompanieService = require('../services/companyService');

module.exports = {

  async show(req, res) {
    try {
      const companiesList = await CompanieService.getAll();
      return res.status(200).json({ data: companiesList, status: 'success' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }   
  },

  async create(req, res) {
    const { name, cnpj, city, coordinatesX, coordinatesY, informations } = req.body;

    if (!name || !cnpj || !city || !coordinatesX || !coordinatesY) {
      return res.status(400).json({ error: "Nome, CNPJ, Cidade e Coordenadas são obrigatórios." });
    }

    const company = await CompanieService.createCompany({
      name,
      cnpj,
      city,
      coordinatesX,
      coordinatesY,
      informations
    });

    return res.json(company);    
  },

  async delete(req, res) {
    const { id } = req.params;

    const companyDeleted = await CompanieService.deleteCompany(id);

    if (companyDeleted) {
      return res.status(200).json({ data: companyDeleted, status: 'Success' });      
    }

    return res.status(401).json({ error: "Não foi encontrado o registro para deletar." });
  },

  async findByName(req, res) {
    const { name } = req.params;

    const companyName = await CompanieService.getByName({ name: name });

    if (companyName) {
      return res.status(200).json({ data: companyName, status: 'Success' });
    }

    return res.status(401).json({ error: 'Empresa com este nome não encontrada.' });
  },

  async findByCnpj(req, res) {
    const { cnpj } = req.params;

    const companyCnpj = await CompanieService.getByCnpj({ cnpj: cnpj });

    if (companyCnpj) {
      return res.status(200).json({ data: companyCnpj, status: 'Success' });
    }

    return res.status(401).json({ error: 'Empresa com este CNPJ não encontrada.' });
  },

  async findByCity(req, res) {
    const { city } = req.params;

    const companyCity = await CompanieService.getByCity({ city: city });

    if (companyCity) {
      return res.status(200).json({ data: companyCity, status: 'Success' });
    }

    return res.status(401).json({ error: 'Empresa não encontrada na cidade informada.' });
  }
}