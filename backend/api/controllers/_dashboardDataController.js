import Subscription from "../models/_subscriptionSchema.js";
import {
  mostUsedSubscriptionAggregate,
  potentialMonthlySavingsAggregate,
  totalMonthlyCostAggregate,
  barelyUsedMostExpensiveAggregate,
} from "../data/_aggregates.js";

/**
 * Returns consolidated dashboard data
 */
export async function getDashboardData(req, res, next) {
  const { userId } = req.auth;

  console.info(
    new Date().toISOString(),
    "getDashboardData, request for user",
    userId,
  );

  // get all the aggregates!
  const mostUsedAggregate = mostUsedSubscriptionAggregate(userId);
  const leastUsedAggregate = mostUsedSubscriptionAggregate(userId, 1);
  const totalCostAggregate = totalMonthlyCostAggregate(userId);
  const potentialSavingsAggregate = potentialMonthlySavingsAggregate(userId);
  const barelyUsedAggregate = barelyUsedMostExpensiveAggregate(userId);

  const [
    mostUsedResult,
    leastUsedResult,
    totalCostResult,
    potentialSavingsResult,
    barelyUsedResult,
  ] = await Promise.all([
    Subscription.aggregate(mostUsedAggregate),
    Subscription.aggregate(leastUsedAggregate),
    Subscription.aggregate(totalCostAggregate),
    Subscription.aggregate(potentialSavingsAggregate),
    Subscription.aggregate(barelyUsedAggregate),
  ]);

  // all results here are arrays with exactly one object in them
  // TODO: More error handling. Probably...
  const mostUsed = mostUsedResult[0] ?? {};
  const leastUsed = leastUsedResult[0] ?? {};
  const totalCost = totalCostResult[0] ?? { totalCostPerMonth: 0 };
  const potentialSavings = potentialSavingsResult[0] ?? {
    potentialMonthlySavings: 0,
  };
  const barelyUsedMostExpensive = barelyUsedResult[0] ?? {};

  const dashboardData = {
    mostUsed,
    leastUsed,
    barelyUsedMostExpensive,
    ...totalCost,
    ...potentialSavings,
  };

  res.status(200).json(dashboardData);
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

  const [result] = await Subscription.aggregate(aggregate);

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

  const [result] = await Subscription.aggregate(aggregate);

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

  const [result] = await Subscription.aggregate(aggregate);

  res.status(200).json(result);
}
