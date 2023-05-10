import User from "../models/User.js";

const createService = (body) => User.create(body);
const findAllService = () => User.find();
const findByIdService = (id) => User.findById(id);
const updateService = (id, name, email, password, document, usertype) => User.findOneAndUpdate({ _id: id }, { name, email, password, document, usertype });
const deleteService = (id) => User.findByIdAndDelete(id);

export default {
  createService,
  findAllService,
  findByIdService,
  updateService,
  deleteService,
};