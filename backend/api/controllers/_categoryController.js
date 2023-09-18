import Category from "../models/_categorySchema.js";

// ---- GET /api/categories ----
export async function getAllCategories(req, res, next) {
  const categories = await Category.find({});

  if (!categories) {
    return res.status(404).send("No categories found.");
  }

  res.status(200).json(categories);
}

// ---- GET /api/categories/:id ----
export async function getCategoryById(req, res, next) {
  const { id } = req.params;

  const category = await Category.findOne({ _id: id });

  if (!category) {
    return res.status(404).send(`Category ${id} not found.`);
  }

  res.state(200).json(category);
}
