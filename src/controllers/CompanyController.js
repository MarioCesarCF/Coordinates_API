const Companies = require('../models/CompanyData');

module.exports = {
  create(req, res) {
    const { name, cnpj, city, coordenatesX, coordenatesY, informations } = req.body;

    console.log(name);
  }

  
}