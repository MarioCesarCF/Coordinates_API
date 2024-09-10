import Empreendimento from "../models/Empreendimento.js";

class EmpreendimentoRepository {
  createEmpreendimento = (empreendimento) => Empreendimento.create(empreendimento);
  findAllRepository = () => Empreendimento.find();
  
  getAll = (query) =>{
    // 'for' usado para buscar por qualquer correspondencia da string passada como query
    for (let key in query) {
      if (typeof query[key] === 'string') {
          query[key] = { $regex: query[key], $options: 'i' };
      }
    }
    return Empreendimento.find(query);
  }

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
