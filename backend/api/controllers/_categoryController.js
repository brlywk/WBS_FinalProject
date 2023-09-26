import Category from "../models/_categorySchema.js";
import { usedCategoryFullDataAggregate } from "../data/_aggregates.js";

// ---- GET /api/categories ----
export async function getAllCategories(req, res, next) {
  console.info(new Date().toISOString(), "getAllCategories");

  const categories = await Category.find({});

  res.status(200).json(categories);
}

// ---- GET /api/categories/used ----
export async function getUsedCategories(req, res, next) {
  const { userId } = req.auth;

  console.info(new Date().toISOString(), "getUsedCategories");

  const aggregate = usedCategoryFullDataAggregate();

  const usedCategories = await Category.aggregate(aggregate);

  res.status(200).json(usedCategories);
}

// ---- GET /api/categories/:id ----
export async function getCategoryById(req, res, next) {
  const { id } = req.params;

  console.info(new Date().toISOString(), "getCategoryById, request for id", id);

  const category = await Category.findOne({ _id: id });

  if (!category) {
    return res.status(404).send(`Category ${id} not found.`);
  }

  res.state(200).json(category);
}
