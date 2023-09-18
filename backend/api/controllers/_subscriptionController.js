import Subscription from "../models/_subscriptionSchema.js";

// ---- GET /api/subscriptions ----
export async function getAllSubscriptions(req, res, next) {
  res.status(200).send("getAllSubscriptions");
}

// ---- POST /api/subscriptions ----
export async function postSubscription(req, res, next) {
  res.status(200).send("postSubscription");
}

// ---- GET /api/subscriptions/:id ----
export async function getSubscriptionById(req, res, next) {
  res.status(200).send("getSubscriptionById");
}

// ---- PUT /api/subscriptions/:id ----
export async function putSubscriptionById(req, res, next) {
  res.status(200).send("putSubscriptionById");
}

// ---- DELETE /api/subscriptions/:id ----
export async function deleteSubscriptionById(req, res, next) {
  res.status(200).send("deleteSubscriptionById");
}
