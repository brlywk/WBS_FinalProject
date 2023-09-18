import clerk, {
  ClerkExpressWithAuth,
  ClerkExpressRequireAuth,
} from "@clerk/clerk-sdk-node";

import subscriptionRouter from "./_subscriptionRouter.js";
import categoryRouter from "./_categoryRouter.js";
import usageRouter from "./_usageRouter.js";

import { Router } from "express";

const apiRouter = Router();

// ---- ROUTE: /api/subscriptions ----
apiRouter.use("/subscriptions", subscriptionRouter);

// ---- ROUTE: /api/categories ----
apiRouter.use("/categories", categoryRouter);

// ---- ROUTE: /api/usages ----
apiRouter.use("/usages", usageRouter);

export default apiRouter;

// test for restricted route that returns an error when unauhtorised
// apiRouter.route("/restricted").get(
//   ClerkExpressRequireAuth(),
//   asyncWrapper(async (req, res, next) => {
//     console.log(
//       new Date().toLocaleDateString(),
//       "Request has been made to restricted endpoint by user:\n",
//       req.auth.userId,
//     );
//     res.status(200).json({ message: "Allowed" });
//   }),
// );
