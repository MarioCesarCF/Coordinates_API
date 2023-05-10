import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connection from "./config/dbConfig.js";
import cors from "cors";

import companyRoute from "./routes/company.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
const port = process.env.PORT || 27017;
app.use(cors());

connection();

app.use(express.json());
app.use("/companies", companyRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`App listen port ${port}`);
});
