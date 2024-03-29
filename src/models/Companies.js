import mongoose from 'mongoose';

const CompanyDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  coordinatesX: {
    type: Number,
    required: true,
  },
  coordinatesY: {
    type: Number,
    required: true,
  },
  number_processo: {
    type: String,
    required: true,
  },
  informations: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
});

const Company = mongoose.model("Companies", CompanyDataSchema);

export default Company;