import ClientRepository from "../repositories/client.repository.js";
import bcrypt from "bcryptjs";

const clientRepository = new ClientRepository();

class ClientService {
  create = async (body) => {
    const { name, email, password, document, phone_number } = body;

    if (!name || !email || !password || !document || !phone_number)
      throw new Error("Preencha todos os campos obrigatórios ao registro.");

    const fouderClient = await clientRepository.findByEmailRepository(email);

    if (fouderClient) throw new Error("Cliente já existe.");

    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*=+?<>])[0-9a-zA-Z!@#$%&*=+?<>]{8,}$/g;

    if (!password.match(regex))
      throw new Error(
        "Use uma senha forte, com: pelo menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e um caractere especial (!@#$%&*<>:;?+=)"
      );

    const client = await clientRepository.createRepository(body);

    if (!client) throw new Error("Erro ao criar cliente.");

    return {
      message: "Cliente criado com sucesso.",
      client: {
        id: client._id,
        name,
        email,
        document,
        phone_number,
      },
    };
  };

  findAll = async () => {
    const clients = await clientRepository.findAllRepository();

    if (clients.length === 0) throw new Error("Não há clientes cadastrados.");

    const pageData = {
      results: clients.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        document: item.document,
        phone_number: item.phone_number,
      })),
    };

    return pageData;
  };

  findById = async (clientId, clientIdLogged) => {
    let idParam;
    if (!clientId) {
      clientId = clientIdLogged;
      idParam = clientId;
    } else {
      idParam = clientId;
    }

    if (!idParam)
      throw new Error("Envie um id nos parâmetros para procurar o cliente.");

    const client = await clientRepository.findByIdRepository(idParam);

    return client;
  };

  update = async (body, clientId) => {
    let { name, email, password, document, phone_number } = body;

    if (!name && !email && !password && !document && !phone_number)
      throw new Error("Envie um ou mais campos para atualização.");

    const client = await clientRepository.findByIdRepository(clientId);

    if (client.id != clientId)
      throw new Error("Você não pode atualizar este cliente.");

    if (password) {
      const regex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*=+?<>])[0-9a-zA-Z!@#$%&*=+?<>]{8,}$/g;

      if (!password.match(regex))
        throw new Error(
          "Use uma senha forte, com: pelo menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e um caractere especial (!@#$%&*<>:;?+=)"
        );
      
      body.password = await bcrypt.hash(password, 10);
    }
    
    await clientRepository.updateRepository(clientId, body);

    return { message: "Cliente atualizado com sucesso!" };
  };

  excludes = async (clientId) => {
    const client = await clientRepository.findByIdRepository(clientId);

    if (client.id != clientId)
      throw new Error("Você não pode deletar este cliente.");

    await clientRepository.deleteRepository(clientId);

    return { message: "Cliente deletado com sucesso!" };
  };
}

export default ClientService;
