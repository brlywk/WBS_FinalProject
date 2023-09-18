import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import categoryRouter from "./_categoryRouter.js";
import subscriptionRouter from "./_subscriptionRouter.js";
import usageRouter from "./_usageRouter.js";

import { Router } from "express";

import asyncWrap from "../utils/_asyncWrapper.js";

const apiRouter = Router();

// ---- ROUTE: /api/subscriptions ----
apiRouter.use("/subscriptions", subscriptionRouter);

// ---- ROUTE: /api/categories ----
apiRouter.use("/categories", categoryRouter);

// ---- ROUTE: /api/usages ----
apiRouter.use("/usages", usageRouter);

export default apiRouter;
