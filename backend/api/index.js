import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import apiRouter from "./routes/_apiRouter.js";
import errorHandler from "./middleware/_errorHandler.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

// ---- ROUTE: /api ----
server.use("/api", apiRouter);

// ---- ERROR HANDLING ----
server.use(errorHandler);

// ---- RUN SERVER ----
const port = process.env.PORT;

server.listen(port, () =>
  console.log(`Server running, listening to port ${port}`),
);
