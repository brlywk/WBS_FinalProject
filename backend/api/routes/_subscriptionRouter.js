import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { Router } from "express";
import {
  deleteSubscriptionById,
  getAllSubscriptions,
  getSubscriptionById,
  postSubscription,
  putSubscriptionById,
} from "../controllers/_subscriptionController.js";
import asyncWrap from "../utils/_asyncWrapper.js";

const subscriptionRouter = Router();

// ---- ROUTE: /api/subscriptions ----
subscriptionRouter
  .route("/")
  .get(ClerkExpressRequireAuth(), asyncWrap(getAllSubscriptions));

subscriptionRouter
  .route("/")
  .post(ClerkExpressRequireAuth(), asyncWrap(postSubscription));

// ---- ROUTE: /api/subscriptions/:id ----
subscriptionRouter
  .route("/:id")
  .get(ClerkExpressRequireAuth(), asyncWrap(getSubscriptionById));

subscriptionRouter
  .route("/:id")
  .get(ClerkExpressRequireAuth(), asyncWrap(putSubscriptionById));

subscriptionRouter
  .route("/:id")
  .delete(ClerkExpressRequireAuth(), asyncWrap(deleteSubscriptionById));

export default subscriptionRouter;
