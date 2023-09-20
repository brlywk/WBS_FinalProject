import Subscription from "../models/_subscriptionSchema.js";
import {
  mostUsedSubscriptionAggregate,
  potentialMonthlySavingsAggregate,
  totalMonthlyCostAggregate,
} from "../data/_aggregates.js";

/**
 * Returns consolidated dashboard data
 */
export function getDashboardData(req, res, next) {
  const { userId } = req.auth;

  console.info(
    new Date().toISOString(),
    "getDashboardData, request for user",
    userId,
  );

  // get all the aggregates!
  const mostUsedAggregate = mostUsedSubscriptionAggregate(userId);
  const totalCostAggregate = totalMonthlyCostAggregate(userId);
  const potentialSavingsAggregate = potentialMonthlySavingsAggregate(userId);

  const [mostUsedResult, totalCostResult, potentialSavingsResult] = Promise.all(
    [
      Subscription.aggregate(mostUsedAggregate),
      Subscription.aggregate(totalCostAggregate),
      Subscription.aggregate(potentialSavingsAggregate),
    ],
  );

  console.log("mostUsedResult", mostUsedResult);
  console.log("totalCostResult", totalCostResult);
  console.log("potentialSavingsResult", potentialSavingsResult);

  res.status(200).send("k");
}

/**
 * Return the users most used subscription
 */
export async function getMostUsedSubscription(req, res, next) {
  const { userId } = req.auth;

  console.info(
    new Date().toISOString(),
    "getMostUsedSubscription, request for user",
    userId,
  );

  const aggregate = mostUsedSubscriptionAggregate(userId);

  const result = await Subscription.aggregate(aggregate);

  res.status(200).json(result);
}

/**
 * Returns the users potential montyly savings
 */
export async function getPotentialMonthlySavings(req, res, next) {
  const { userId } = req.auth;

  console.info(
    new Date().toISOString(),
    "getPotentialMonthlySavings, request for user",
    userId,
  );

  const aggregate = potentialMonthlySavingsAggregate(userId);

  const result = await Subscription.aggregate(aggregate);

  res.status(200).json(result);
}

/**
 * Returns total monthly cost of all subscriptions
 */
export async function getTotalMonthlyCost(req, res, next) {
  const { userId } = req.auth;

  console.info(
    new Date().toISOString(),
    "getTotalMonthlyCost, request for user",
    userId,
  );

  const aggregate = totalMonthlyCostAggregate(userId);

  const result = await Subscription.aggregate(aggregate);

  res.status(200).json(result);
}
