import User from "../models/User.js";

class UserRepository {
  createRepository = (body) => User.create(body);
  findAllRepository = () => User.find();
  findByIdRepository = (id) => User.findById(id);
  findByEmail = (email) => User.findOne({ email: email });
  updateRepository = (id, body) =>
    User.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { returnNewDocument: true }
    );
  deleteRepository = (id) => User.findByIdAndDelete(id);
}

export default UserRepository;
