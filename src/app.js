import cors from "cors";
import "dotenv/config";
import express from "express";
import connection from "./config/dbConfig.js";
import router from "./routes/index.route.js";

const app = express();
app.use(cors());
connection();
app.use(express.json());

app.use(router);

export default app;
