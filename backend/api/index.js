import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import db from "./data/_mongodb.js";

import apiRouter from "./routes/_apiRouter.js";
import categoryRouter from "./routes/_categoryRouter.js";

import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import errorHandler from "./middleware/_errorHandler.js";
import { checkUserId } from "./middleware/_requestChecker.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

// All requests need to have clerk auth infos, and we need a userId in the request!
server.use(ClerkExpressRequireAuth());
server.use(checkUserId);

// ---- ROUTE: /api ----
server.use("/api", apiRouter);

// ---- ROUTE: /catgories ----
server.use("/categories", categoryRouter);

// ---- ERROR HANDLING ----
server.use(errorHandler);

// ---- RUN SERVER ----
const port = process.env.PORT;

// use simple retry strategy
const maxRetries = 5;
const retryWaitTime = 5000;
let retries = 0;

function startServer() {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

function tryDbConnection() {
  if (db.readyState === 1) {
    clearInterval(retryInterval);

    startServer();
  } else {
    if (retries <= maxRetries) {
      console.log(`Retrying connection to MongoDB... ${retries}/${maxRetries}`);
      retries++;
    } else {
      console.log("Max retries reached. Exiting...");
      clearInterval(retryInterval);
      process.exit(1);
    }
  }
}

const retryInterval = setInterval(tryDbConnection, retryWaitTime);
