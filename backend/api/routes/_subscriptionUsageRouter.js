import { Router } from "express";
import {
  getAllSubscriptionUsage,
  getSingleSubscriptionUsage,
} from "../controllers/_subscriptionUsageController.js";
import { checkParamForId } from "../middleware/_requestChecker.js";
import asyncWrap from "../utils/_asyncWrapper.js";

const subscriptionUsageRouter = Router();

// ---- ROUTE: /api/subscriptionUsage ----
subscriptionUsageRouter.route("/").get(asyncWrap(getAllSubscriptionUsage));

// ---- ROUTE: /api/subscriptionUsage/:id ----
subscriptionUsageRouter
  .route("/:id")
  .get(checkParamForId, asyncWrap(getSingleSubscriptionUsage));

export default subscriptionUsageRouter;
