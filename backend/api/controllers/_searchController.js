import Subscription from "../models/_subscriptionSchema.js";
import { searchAggregate } from "../data/_aggregates.js";

export async function getSubscriptionSearch(req, res, next) {
  const { userId } = req.auth;
  const { query } = req.query;

  if (!query) {
    throw new Error("Missing query parameter");
  }

  console.info(
    new Date().toISOString(),
    "getSubscriptionSearch, request for user",
    userId,
    "with query:",
    query,
  );

  const aggregate = searchAggregate(query);

  const searchResults = await Subscription.aggregate(aggregate);

  res.status(200).json(searchResults);
}
