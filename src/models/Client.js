import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  document: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
});

ClientSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Client = mongoose.model("Client", ClientSchema);

export default Client;
