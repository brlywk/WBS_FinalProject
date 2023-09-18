import Usage from "../models/_usageSchema.js";

// ---- GET /api/usages ----
export async function getAllUsages(req, res, next) {
  res.status(200).send("getAllUsages");
}

// ---- POST /api/usages ----
export async function postUsage(req, res, next) {
  res.status(200).send("postUsage");
}

// ---- GET /api/usages/:id ----
export async function getUsageById(req, res, next) {
  res.status(200).send("getUsageById");
}

// NOTE: Current assumption is that we don't need to actually edit or delete any feedback
