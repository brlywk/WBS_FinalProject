/**
 * Creates a subscription body to be sent to a POST endpoint
 */
export function createSubscriptionBody(name, price, categoryId, interval) {
  return {
    name,
    price,
    category: categoryId,
    interval,
  };
}
/**
 * Creates an Usage body to be sent to a POST endpoint
 */
export function createUsageBody(subscriptionId, score) {
  return {
    subscriptionId,
    score,
  };
}
