import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
} from "../controllers/_categoryController.js";
import { checkParamForId } from "../middleware/_requestChecker.js";
import asyncWrap from "../utils/_asyncWrapper.js";

const categoryRouter = Router();

// ---- ROUTE: /api/categories ----
categoryRouter.route("/").get(asyncWrap(getAllCategories));

// ---- ROUTE: /api/categories/:id ----
categoryRouter.route("/:id").get(checkParamForId, asyncWrap(getCategoryById));

export default categoryRouter;
