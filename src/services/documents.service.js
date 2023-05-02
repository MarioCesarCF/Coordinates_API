import jwt from "jsonwebtoken";
import Document from "../models/Documents.js";

const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.KEY_TOKEN, { expiresIn: 86400 });

//tentativas de upload e download de arquivos com node
const uploadService = async (file) => Document.create(file);
const downloadService = (id) => Document.findById(id);

export { generateToken, uploadService, downloadService };