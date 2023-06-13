import Client from "../models/Client.js";

class ClientRepository {
  createRepository = (body) => Client.create(body);
  findAllRepository = () => Client.find();
  findByIdRepository = (id) => Client.findById(id);
  findByEmailRepository = (email) => Client.findOne({ email: email });
  updateRepository = (id, body) =>
    Client.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { returnNewDocument: true }
    );
  deleteRepository = (id) => Client.findByIdAndDelete(id);
}

export default ClientRepository;
