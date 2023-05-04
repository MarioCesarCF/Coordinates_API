import mongoose from 'mongoose';

const CompanyDataSchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  city: String,
  coordinatesX: Number,
  coordinatesY: Number,
  informations: String,
});

const Company = mongoose.model("Companies", CompanyDataSchema);

export default Company;