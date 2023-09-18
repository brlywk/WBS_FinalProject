import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import asyncWrap from "../utils/_asyncWrapper.js";

import {
  getAllUsages,
  postUsage,
  getUsageById,
} from "../controllers/_usageController";

const usageRouter = Router();

// ---- ROUTE: /api/usages ----
usageRouter.route("/").get(ClerkExpressRequireAuth(), asyncWrap(getAllUsages));

usageRouter.route("/").post(ClerkExpressRequireAuth(), asyncWrap(postUsage));

// ---- ROUTE: /api/usages/:id ----
usageRouter
  .route("/:id")
  .get(ClerkExpressRequireAuth(), asyncWrap(getUsageById));
