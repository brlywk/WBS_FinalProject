import { Router } from "express";

import {
  getAllUsages,
  getUsageById,
  postUsage,
} from "../controllers/_usageController.js";
import { checkBody, checkParamForId } from "../middleware/_requestChecker.js";
import asyncWrap from "../utils/_asyncWrapper.js";

const usageRouter = Router();

// ---- ROUTE: /api/usages ----
usageRouter.route("/").get(asyncWrap(getAllUsages));

usageRouter.route("/").post(checkBody, asyncWrap(postUsage));

// ---- ROUTE: /api/usages/:id ----
usageRouter.route("/:id").get(checkParamForId, asyncWrap(getUsageById));

export default usageRouter;
