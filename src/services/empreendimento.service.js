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

  showAll = async (nome_fantasia, ramo_atividade, bairro, situacao, limit = 10, skip = 0) => {
    let query = {};
  
    if (nome_fantasia) query.nome_fantasia = nome_fantasia;
    if (ramo_atividade) query.ramo_atividade = ramo_atividade;
    if (bairro) query.bairro = bairro;
    if (situacao !== undefined) query.situacao = situacao;
  
    const empreendimentosList = await empreendimentoRepository
      .getAll(query)
      .limit(limit)
      .skip(skip); 
  
    if (empreendimentosList.length === 0)
      throw { status: 400, message: "Não há empreendimentos cadastrados que correspondam a estes parâmetros." };
  
    const pageData = {
      data: empreendimentosList.map((item) => ({
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
      pagination: {
        limit,
        skip,
        total: empreendimentosList.length,
      },
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

    await empreendimentoRepository.updateRepository(empreendimentoId, body);

    return { message: "Dados da empresa atualizados com sucesso." };
  };

  excludes = async (empreendimentoId) => {
    await empreendimentoRepository.deleteRepository(empreendimentoId);

    return { message: "Empreendimento deletado com sucesso!" };
  };
}

export default EmpreendimentoService;
