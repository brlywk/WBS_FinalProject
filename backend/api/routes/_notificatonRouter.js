import { Router } from "express";
import {
  getNotifications,
  getAndUpdateNotificationById,
} from "../controllers/_notificationController.js";
import asyncWrap from "../utils/_asyncWrapper.js";
import { checkParamForId } from "../middleware/_requestChecker.js";

const notificationRouter = Router();

// ---- ROUTE: /api/notifications
notificationRouter.route("/").get(asyncWrap(getNotifications));

// ---- ROUTE: /api/notifications
notificationRouter
  .route("/:id")
  .get(checkParamForId, asyncWrap(getAndUpdateNotificationById));

export default notificationRouter;
