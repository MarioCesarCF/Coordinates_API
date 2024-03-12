import UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";

const userRepository = new UserRepository();

class UserService {
  create = async (body) => {
    const { name, email, password, document, usertype } = body;

    if (!name || !email || !password || !document || !usertype)
      throw new Error("Preencha todos os campos obrigatórios ao registro.");

    const fouderUser = await userRepository.findByEmail(email);

    if (fouderUser) throw new Error("Usuário já existe.");  

    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*=+?<>])[0-9a-zA-Z!@#$%&*=+?<>]{8,}$/g;

    if (!password.match(regex)) throw new Error(
      "Use uma senha forte, com: pelo menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e um caractere especial (!@#$%&*<>:;?+=)"
    );

    const user = await userRepository.createRepository(body);

    if (!user) throw new Error("Erro ao criar usuário.");

    return {
      message: "Usuário criado com sucesso.",
      user: {
        id: user._id,
        name,
        email,
        document,
        usertype,
      },
    };
  };

  findAll = async () => {
    const users = await userRepository.findAllRepository();

    if (users.length === 0) throw new Error("Não há usuarios cadastrados.");

    const pageData = {
      results: users.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        document: item.document,
        usertype: item.usertype,
      })),
    };

    return pageData;
  };  

  findById = async (userId, userIdLogged) => {
    let idParam;
    if (!userId) {
      userId = userIdLogged;
      idParam = userId;
    } else {
      idParam = userId;
    }

    if (!idParam)
      throw new Error("Envie um id nos parâmetros para procurar o usuário.");

    const user = await userRepository.findByIdRepository(idParam);

    return user;
  };

  findByEmail = async (userEmail) => {    
    if (!userEmail)
      throw new Error("Envie um id nos parâmetros para procurar o usuário.");

    const user = await userRepository.findByEmail(userEmail);

    if (!user)
      throw new Error("Usuário não encontrado.");
    
    return user;
  };

  update = async (body, userId) => {
    let { name, email, password, document, usertype } = body;

    if (!name && !email && !password && !document && !usertype)
      throw new Error("Envie um ou mais campos para atualização.");

    const user = await userRepository.findByIdRepository(userId);

    if (user.id != userId)
      throw new Error("Você não pode atualizar este usuário.");

    if (password) {
      const regex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*=+?<>])[0-9a-zA-Z!@#$%&*=+?<>]{8,}$/g;

      if (!password.match(regex))
        throw new Error(
          "Use uma senha forte, com: pelo menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e um caractere especial (!@#$%&*<>:;?+=)"
        );

      body.password = await bcrypt.hash(password, 10);
    }
    
    await userRepository.updateRepository(userId, body);

    return { message: "Usuário atualizado com sucesso!" };
  };

  excludes = async (userId) => {
    const user = await userRepository.findByIdRepository(userId);

    if (user.id != userId)
      throw new Error("Você não pode deletar este usuário.");

    await userRepository.deleteRepository(userId);

    return { message: "Usuário deletado com sucesso!" };
  };
}

export default UserService;