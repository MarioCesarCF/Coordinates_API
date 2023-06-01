import bcrypt from "bcrypt";
import LoginService from "../services/auth.service.js";

const loginService = new LoginService();

class LoginController {
 login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await loginService.login(email, password);

    // if (!user) {
    //   return res.status(404).send({ message: "Invalid email or password." });
    // }

    // const passwordIsValid = await bcrypt.compare(password, user.password);

    // if (!passwordIsValid) {
    //   return res.status(404).send({ message: "Invalid email or password." });
    // }

    // const token = generateToken(user.id);

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
}



export default LoginController;