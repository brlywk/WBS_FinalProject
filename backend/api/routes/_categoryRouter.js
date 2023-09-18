import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import asyncWrap from "../utils/_asyncWrapper.js";
import {
  getAllCategories,
  getCategoryById,
} from "../controllers/_categoryController.js";

const categoryRouter = Router();

// ---- ROUTE: /api/categories ----
categoryRouter
  .route("/")
  .get(ClerkExpressRequireAuth(), asyncWrap(getAllCategories));

// ---- ROUTE: /api/categories/:id ----
categoryRouter
  .route("/:id")
  .get(ClerkExpressRequireAuth(), asyncWrap(getCategoryById));

export default categoryRouter;
