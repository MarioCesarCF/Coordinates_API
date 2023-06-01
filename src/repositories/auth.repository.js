import User from "../models/User.js";
import jwt from "jsonwebtoken";

class LoginRepository {
  loginRepository = async (email) =>
    User.findOne({ email: email }).select("+password");

  generateToken = async (id) =>
    jwt.sign({ id: id }, process.env.KEY_TOKEN, { expiresIn: 86400 });
}

export default LoginRepository;
