import mongoose from "mongoose";
import ClientRepository from "../repositories/client.repository.js";

const clientRepository = new ClientRepository();

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

export const validClient = async (req, res, next) => {
  try {
    const id = req.params.id;

    const client = await clientRepository.findByIdRepository(id);

    if (!client || !client.id) {
      return res.status(400).send({ message: "Cliente não encontrado!" });
    }

    req.id = id;
    req.client = client;

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
