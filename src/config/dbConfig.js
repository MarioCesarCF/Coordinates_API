import mongoose from "mongoose";

const connection = async () => {
  const uri = process.env.DATABASE_URL;
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }
  mongoose.set("strictQuery", true);

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", () => {
    console.log("Erro de conexão.");
  });

  db.on("open", () => {
    console.log("Sucesso de conexão.");
  });

  global.connection = db;
};

connection();

export default connection;
