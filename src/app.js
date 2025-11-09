import express from "express";
import cors from "cors";
import router from "./router/routes.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

app.use("/api/v1/rent-tracker", router);

export { app };