import clerk, {
  ClerkExpressWithAuth,
  ClerkExpressRequireAuth,
} from "@clerk/clerk-sdk-node";

import categoryRouter from "./_categoryRouter.js";
import subscriptionRouter from "./_subscriptionRouter.js";

import { Router } from "express";

const apiRouter = Router();

// ---- ROUTE: /api/categories ----
apiRouter.use("/categories", categoryRouter);

// ---- ROUTE: /api/subscriptions ----
apiRouter.use("/subscriptions", subscriptionRouter);

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
export default apiRouter;
