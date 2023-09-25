import { Router } from "express";
import { getNotifications } from "../controllers/_notificationController.js";
import asyncWrap from "../utils/_asyncWrapper.js";

const notificationRouter = Router();

// ---- ROUTE: /api/notifications
notificationRouter.route("/").get(asyncWrap(getNotifications));

export default notificationRouter;
