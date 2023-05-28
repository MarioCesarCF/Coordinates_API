import mongoose from "mongoose";
import userRepository from "../repositories/user.repository.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "ID inválido." });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userRepository.findByIdRepository(id);

    if (!user || !user.id) {
      return res.status(400).send({ message: "Usuario não encontrado!" });
    }

    req.id = id;
    req.user = user;

    next();
   } catch (error) {
    res.status(500).send({ message: error.message });
  }
}