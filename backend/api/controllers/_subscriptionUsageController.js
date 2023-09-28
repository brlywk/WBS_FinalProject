import Subscription from "../models/_subscriptionSchema.js";
import {
  mostUsedSubscriptionAggregate,
  subscriptionUsageAggregate,
} from "../data/_aggregates.js";

// ---- GET /api/subscriptionUsage ----
export async function getAllSubscriptionUsage(req, res, next) {
  const { userId } = req.auth;

  console.info(
    new Date().toISOString(),
    "getAllSubscriptionUsage, request for user",
    userId,
  );

  const aggregate = subscriptionUsageAggregate(userId);

  const result = await Subscription.aggregate(aggregate);

  res.status(200).json(result);
}

// ---- GET /api/subscriptionUsage/:id ----
export async function getSingleSubscriptionUsage(req, res, next) {
  const { userId } = req.auth;
  const { id } = req.params;

  console.info(
    new Date().toISOString(),
    "getSingleSubscriptionUsage, request for user",
    userId,
    "with id",
    id,
  );

  const aggregate = subscriptionUsageAggregate(userId, id);

  const [result] = await Subscription.aggregate(aggregate);

  res.status(200).json(result);
}
