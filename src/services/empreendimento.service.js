import EmpreendimentoRepository from "../repositories/empreendimento.repository.js";

const empreendimentoRepository = new EmpreendimentoRepository();

class EmpreendimentoService {
  create = async (body) => {
    const {
      razao_social, ramo_atividade, documento, telefone, nome_proprietario, logradouro, bairro
    } = body;   
    
    body.situacao = true;

    if (!razao_social || !ramo_atividade || !documento || !telefone || !nome_proprietario, !logradouro || !bairro)
      throw { status: 400, message: "Preencha todos os campos obrigatórios." };

    await empreendimentoRepository.createEmpreendimento(body);

    return {
      status: 201,
      message: "Empreendimento cadastrado com sucesso.",
    };
  };

  showAll = async (searchDTO) => {
    let query = {};
  
    if (searchDTO.nome_fantasia) query.nome_fantasia = searchDTO.nome_fantasia;
    if (searchDTO.ramo_atividade) query.ramo_atividade = searchDTO.ramo_atividade;
    if (searchDTO.bairro) query.bairro = searchDTO.bairro;
    if (searchDTO.situacao !== undefined) query.situacao = searchDTO.situacao;

  
    const empreendimentosList = await empreendimentoRepository.getAll(query); 
  
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
        criadoPor: item.criadoPor,
        updateAt: item.updatedAt
      })),
      pagination: {
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
    body.updatedAt = new Date();

    await empreendimentoRepository.updateRepository(empreendimentoId, body);

    return { message: "Dados da empresa atualizados com sucesso." };
  };

  excludes = async (empreendimentoId) => {
    await empreendimentoRepository.deleteRepository(empreendimentoId);

    return { message: "Empreendimento deletado com sucesso!" };
  };
}

export default EmpreendimentoService;
