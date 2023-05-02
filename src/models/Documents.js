import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Document = mongoose.model("Document", DocumentSchema);

export default Document;
