import clerk, {
  ClerkExpressWithAuth,
  ClerkExpressRequireAuth,
} from "@clerk/clerk-sdk-node";

import { Router } from "express";
import asyncWrapper from "../utils/_asyncWrapper.js";

const apiRouter = Router();

// test for a route that does not need authorisation
apiRouter.route("/public").get(
  asyncWrapper(async (req, res, next) => {
    const userList = await clerk.users.getUserList();

    res.status(200).json(userList);
  }),
);

// test for restricted route that just returns nothing
apiRouter.route("/private").get(
  ClerkExpressWithAuth(),
  asyncWrapper(async (req, res, next) => {
    res.json(req.auth);
  }),
);

// test for restricted route that returns an error when unauhtorised
apiRouter.route("/restricted").get(
  ClerkExpressRequireAuth(),
  asyncWrapper(async (req, res, next) => {
    console.log(
      new Date().toLocaleDateString(),
      "Request has been made to restricted endpoint by user:\n",
      req.auth.userId,
    );
    res.status(200).json({ message: "Allowed" });
  }),
);
export default apiRouter;
