import cors from "cors";
import "dotenv/config";
import express from "express";
import connection from "./config/dbConfig.js";
import router from "./routes/index.route.js";

const app = express();
app.use(cors());
connection();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});

app.use(router);

export default app;
