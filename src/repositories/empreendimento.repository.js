import Empreendimento from "../models/Empreendimento.js";

class EmpreendimentoRepository {
  createEmpreendimento = (empreendimento) => Empreendimento.create(empreendimento);

  getAll = (query) => {
    let adjustedQuery = {};
    
    for (let key in query) {
      if (query.hasOwnProperty(key)) {
        const value = query[key];
  
        switch (key) {
          case 'nome_fantasia':
          case 'ramo_atividade':
          case 'bairro':
            if (typeof value === 'string') {
              adjustedQuery[key] = { $regex: value, $options: 'i' };
            } else {
              console.warn(`Filtro para ${key} deve ser uma string.`);
            }
            break;
          case 'situacao':
            adjustedQuery[key] = value;
            break;
          default:
            console.warn(`Filtro para ${key} não é suportado.`);
            break;
        }
      }
    }
  
    return Empreendimento.find(adjustedQuery);
  };
  
  

  getById = (id) => Empreendimento.findById(id);

  updateRepository = (id, body) =>
    Empreendimento.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { returnNewDocument: true }
    );

  deleteRepository = (id) => Empreendimento.findByIdAndDelete(id);
}

export default EmpreendimentoRepository;
