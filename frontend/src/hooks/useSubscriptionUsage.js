import ApiEndpoints from "../utils/ApiEndpoints";
import useAuthRequest from "./useAuthRequest";

export default function useSubscriptionUsage() {
  const { startRequest } = useAuthRequest();

  /**
   * Return usage information for all subscriptions
   */
  async function getAllSubscriptionUsage(abortController) {
    return await startRequest(
      ApiEndpoints.subscriptionUsage,
      "get",
      abortController,
    );
  }

  /**
   * Returns a usage information for a single subscription by id
   */
  async function getSubscriptionUsageById(id, abortController) {
    if (!id) {
      throw new Error("Invalid subscription usage ID");
    }

    return await startRequest(
      ApiEndpoints.subscriptionUsageById(id),
      "get",
      abortController,
    );
  }

  return { getAllSubscriptionUsage, getSubscriptionUsageById };
}
