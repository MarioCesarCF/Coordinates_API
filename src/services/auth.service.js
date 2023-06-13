import bcrypt from "bcrypt";
import LoginRepository from "../repositories/auth.repository.js";

const loginRepository = new LoginRepository();

class LoginService {
  login = async (email, password) => {
    const user = await loginRepository.loginRepository(email);

    if (!user) throw new Error("Email ou senha inválidos.");

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) throw new Error("Email ou senha inválidos.");

    const token = loginRepository.generateToken(user.id);

    return token;
  };
  loginClient = async (email, password) => {
    const client = await loginRepository.loginRepositoryClient(email);

    if (!client) throw new Error("Email ou senha inválidos.");

    const passwordIsValid = await bcrypt.compare(password, client.password);

    if (!passwordIsValid) throw new Error("Email ou senha inválidos.");

    const token = loginRepository.generateToken(client.id);

    return token;
  };
}

export default LoginService;
