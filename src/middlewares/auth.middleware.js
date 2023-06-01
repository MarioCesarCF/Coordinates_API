import "dotenv/config";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository.js";

const userRepository = new UserRepository();

class AuthMiddleware {
  authentication = (req, res, next) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        return res.send(401);
      }

      //dividindo as partes do headers 'Bearer' e 'token'
      const parts = authorization.split(" ");

      if (parts.length !== 2) {
        return res.send(401);
      }

      //fazendo a destruturação do array parts
      const [schema, token] = parts;

      if (schema !== "Bearer") {
        return res
          .status(401)
          .send({ message: "A palavra Bearer não foi encontrada no cabeçalho." });
      }

      jwt.verify(token, process.env.KEY_TOKEN, async (error, decoded) => {
        if (error) {
          return res.status(401).send({ message: "Token inválido!" });
        }

        const user = await userRepository.findByIdRepository(decoded.id);

        if (!user || !user.id) {
          return res.status(400).send({ mensage: "Token inválido!" });
        }

        req.userId = user.id;

        //Lembrar de colocar o next() dentro da função.
        return next();
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default AuthMiddleware;
