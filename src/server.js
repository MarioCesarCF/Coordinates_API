import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connection from "./config/dbConfig.js";
import cors from "cors";

import companyRoute from "./routes/company.route.js";

const app = express();
const port = process.env.PORT || 27017;
app.use(cors());

connection();

app.use(express.json());
app.use("/", companyRoute);

app.listen(port, () => {
  console.log(`App listen port ${port}`);
});
