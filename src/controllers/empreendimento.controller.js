import EmpreendimentoService from "../services/empreendimento.service.js";

const empreendimentoService = new EmpreendimentoService();

class EmpreendimentoController {
  createEmpreendimento = async (req, res) => {
    const body = req.body;
    
    try {
      const empreendimento = await empreendimentoService.create(body);

      return res.status(201).send(empreendimento);
    } catch (err) {  
      console.log(err);    
      if (err.status && err.message) {
        return res.status(err.status).send({ message: err.message });
      } else {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
      }
    }
  };

  showEmpreendimentos = async (req, res) => {
    try {
      const { nome_fantasia, ramo_atividade, bairro } = req.query;
      const empreendimentos = await empreendimentoService.showAll(nome_fantasia, ramo_atividade, bairro);

      return res.status(200).send(empreendimentos);
    } catch (err) {      
      if (err.status && err.message) {
        return res.status(err.status).send({ message: err.message });
      } else {
        return res.status(500).send({ message: 'Erro interno do servidor.' });
      }
    }
  };

  findEmpreendimento = async (req, res) => {
    const { id: empreendimentoId } = req.params;
    try {
      const empreendimento = await empreendimentoService.findById(empreendimentoId);

      return res.status(200).send(empreendimento);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
  updateEmpreendimento = async (req, res) => {
    const body = req.body;
    const { id: empreendimentoId } = req.params;

    try {
      const response = await empreendimentoService.update(body, empreendimentoId);

      return res.send(response);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };  

  deleteEmpreendimento = async (req, res) => {
    const { id: empreendimentoId } = req.params;
    try {
      const emp = await empreendimentoService.excludes(empreendimentoId);

      return res.send(emp);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  };
}

export default EmpreendimentoController;
