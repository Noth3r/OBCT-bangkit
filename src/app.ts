import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import router from "./routes";
import { cert, initializeApp } from "firebase-admin/app";

dotenv.config();

const serviceAccount = require("./config/firebase-admin.json");
const swaggerFile = require("./utils/swagger-output.json");

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    explorer: true,
  })
);

app.use(helmet());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
