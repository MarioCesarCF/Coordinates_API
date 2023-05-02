import express from "express";
import connection from "./config/dbConfig.js";
import dotenv from "dotenv";
import cors from "cors";

import companyRoute from "./routes/company.route.js";
import documenRoute from "./routes/documents.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 27017;
app.use(cors());

connection();

app.use(express.json());
app.use("/company", companyRoute);
app.use("/document", documenRoute);

app.listen(port, () => { console.log(`App listen port ${port}`) })

