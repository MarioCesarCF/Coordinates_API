import UserRepository from "../repositories/user.repository.js";
import bcrypt from "bcryptjs";

const userRepository = new UserRepository();

class UserService {
  create = async (body) => {
    const { name, email, password, document, usertype } = body;

    if (!name || !email || !password || !document || !usertype)
      throw new Error("Preencha todos os campos obrigatórios ao registro.");

    console.log(email);

    const fouderUser = await userRepository.findByEmailRepository(email);

    if (fouderUser) throw new Error("Usuário já existe.");

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

    return users;
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

  update = async (body, userId) => {
    let { name, email, password, document, usertype } = body;

    if (!name && !email && !password && !document && !usertype)
      throw new Error("Envie um ou mais campos para atualização.");

    const user = await userRepository.findByIdRepository(userId);

    if (user.id != userId)
      throw new Error("Você não pode atualizar este usuário.");

    if (password) {
      body.password = await bcrypt.hash(password, 10);
    }

    await userRepository.updateRepository(userId, body);

    return { message: "Usuário atualizado com sucesso!" };
  };

  excludes = async (userId) => {
    const user = await userRepository.findByIdRepository(userId);

    if (user.id != userId)
      throw new Error("Você não pode atualizar este usuário.");

    await userRepository.deleteRepository(userId);

    return { message: "Usuário deletado com sucesso!" };
  };
}

export default UserService;
