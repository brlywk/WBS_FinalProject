import categoryRouter from "./_categoryRouter.js";
import subscriptionRouter from "./_subscriptionRouter.js";
import subscriptionUsageRouter from "./_subscriptionUsageRouter.js";
import usageRouter from "./_usageRouter.js";
import dashboardDataRouter from "./_dashboardDataRouter.js";

import { Router } from "express";

const apiRouter = Router();

// ---- ROUTE: /api/subscriptions ----
apiRouter.use("/subscriptions", subscriptionRouter);

// ROUTE: /api/subscriptionUsage ----
apiRouter.use("/subscriptionUsage", subscriptionUsageRouter);

// ---- ROUTE: /api/categories ----
apiRouter.use("/categories", categoryRouter);

// ---- ROUTE: /api/usages ----
apiRouter.use("/usages", usageRouter);

// ---- ROUTE: /api/dashboard
apiRouter.use("/dashboard", dashboardDataRouter);

export default apiRouter;
