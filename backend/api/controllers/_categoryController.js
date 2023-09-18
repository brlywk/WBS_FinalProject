import Category from "../models/_categorySchema.js";

// ---- GET /api/categories ----
export async function getAllCategories(req, res, next) {
  res.status(200).send("getAllCategories");
}

// ---- GET /api/categories/:id ----
export async function getCategoryById(req, res, next) {
  res.status(200).send("getCategoryById");
}
