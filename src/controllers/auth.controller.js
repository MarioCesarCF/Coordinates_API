import LoginService from "../services/auth.service.js";

const loginService = new LoginService();

class LoginController {
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const data = await loginService.login(email, password);

      res.send({ data });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  loginClient = async (req, res) => {
    const { email, password } = req.body;

    try {
      const token = await loginService.loginClient(email, password);

      res.send({ token });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}



export default LoginController;