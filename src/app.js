import express from "express";
import cors from "cors";
import router from "./router/routes.js";

const app = express();

const allowedOrigins = [
  'http://localhost:5173/',
  'https://rent-tracker-frontend.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}))

app.use("/api/v1/rent-tracker", router);

export { app };