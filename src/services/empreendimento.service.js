import EmpreendimentoRepository from "../repositories/empreendimento.repository.js";

const empreendimentoRepository = new EmpreendimentoRepository();

class EmpreendimentoService {
  create = async (body) => {
    const {
      nome_fantasia, razao_social, ramo_atividade, documento, telefone, nome_proprietario, responsavel_tecnico, logradouro, numero, bairro
    } = body;   
    
    body.situacao = true;

    if (!razao_social || !ramo_atividade || !documento || !telefone || !nome_proprietario, !logradouro || !bairro)
      throw { status: 400, message: "Preencha todos os campos obrigatórios." };

    // const documentoIsNaN = isNaN(documento);

    // if ((documento.length !== 11 && documento.length !== 14) || documentoIsNaN)
    //   throw { status: 400, message: "Informe um número de documento válido. Informe apenas números." };  

    await empreendimentoRepository.createEmpreendimento(body);

    return {
      status: 201,
      message: "Empreendimento cadastrado com sucesso.",
    };
  };

  showAll = async (nome_fantasia, ramo_atividade, bairro) => {
    let query = {};
  
    if (nome_fantasia) query.nome_fantasia = nome_fantasia;
    if (ramo_atividade) query.ramo_atividade = ramo_atividade;
    if (bairro) query.bairro = bairro;

    const empreendimentosList = await empreendimentoRepository.findAllRepository();
    //const empreendimentosList = await empreendimentoRepository.getAll(query);
    
    if (empreendimentosList.length === 0)
      throw { status: 400, message: "Não há empreendimentos cadastrados que correspondam a estes parâmetros."};

    const pageData = {
      results: empreendimentosList.map((item) => ({
        id: item._id,
        nome_fantasia: item.nome_fantasia,
        razao_social: item.razao_social,
        ramo_atividade: item.ramo_atividade,
        documento: item.documento,
        telefone: item.telefone,
        nome_proprietario: item.nome_proprietario,
        responsavel_tecnico: item.responsavel_tecnico,
        logradouro: item.logradouro,
        numero: item.numero,
        bairro: item.bairro,
        situacao: item.situacao,
      })),
    };

    return pageData;
  };

  findById = async (param) => {
    const empreendimentoId = param;

    const empreendimento = await empreendimentoRepository.getById(empreendimentoId);

    if (empreendimento.length === 0) {
      throw new Error("Empreendimento não encontrado.");
    }

    return empreendimento;
  };    

  update = async (body, empreendimentoId) => {
    const { nome_fantasia, razao_social, ramo_atividade, documento, telefone, nome_proprietario, responsavel_tecnico, logradouro, numero, bairro, situacao } =
      body;

    // if (!name && !document && !city && !coordinatesX && !coordinatesY)
    //   throw new Error("Envie um ou mais campos para atualização.");

    // const empreendimento = await empreendimentoRepository.getById(empreendimentoId);

    // if (company.id != empreendimentoId)
    //   throw new Error("Você não pode atualizar os dados dessa empresa.");

    await empreendimentoRepository.updateRepository(empreendimentoId, body);

    return { message: "Dados da empresa atualizados com sucesso." };
  };

  excludes = async (empreendimentoId) => {
    // const empreendimento = await empreendimentoRepository.getById(empreendimentoId);

    // if (empreendimento.id != empreendimentoId)
    //   throw new Error("Você não pode deletar este empreendimento.");

    await empreendimentoRepository.deleteRepository(empreendimentoId);

    return { message: "Empreendimento deletado com sucesso!" };
  };
}

export default EmpreendimentoService;
