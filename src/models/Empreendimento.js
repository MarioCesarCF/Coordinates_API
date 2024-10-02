import mongoose from 'mongoose';

const EmpreendimentoDataSchema = new mongoose.Schema({
  nome_fantasia: {
    type: String,
  },
  razao_social: {
    type: String,
    required: true,
  },
  ramo_atividade: {
    type: String,
    required: true,
  },
  documento: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  nome_proprietario: {
    type: String,
    required: true,
  },
  responsavel_tecnico: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  logradouro: {
    type: String,
  },
  numero: {
    type: Number,
  },
  bairro: {
    type: String,
  },
  situacao: {
    type: Boolean,
  }
});

const Empreendimento = mongoose.model("Empreendimento", EmpreendimentoDataSchema);

export default Empreendimento;