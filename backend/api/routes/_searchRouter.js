import { Router } from "express";
import { getSubscriptionSearch } from "../controllers/_searchController.js";
import asyncWrap from "../utils/_asyncWrapper.js";

const searchRouter = Router();

// ---- ROUTE: /api/search ----
searchRouter.route("/").get(asyncWrap(getSubscriptionSearch));

export default searchRouter;
