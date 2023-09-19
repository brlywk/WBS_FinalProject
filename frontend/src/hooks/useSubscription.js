import ApiEndpoints from "../utils/ApiEndpoints";
import useAuthRequest from "./useAuthRequest";

// TODO: Better error hanling
export default function useSubscription() {
  const { startRequest } = useAuthRequest();

  async function getAllSubscriptions(abortController) {
    return await startRequest(
      ApiEndpoints.subscriptions,
      "get",
      abortController,
    );
  }

  async function getSubscriptionById(id, abortController) {
    if (!id) {
      throw new Error("Invalid subscription ID");
    }

    return await startRequest(
      ApiEndpoints.subscription(id),
      "get",
      abortController,
    );
  }

  async function createSubscription(subscription, abortController) {
    if (!subscription) {
      throw new Error("Invalid subscription");
    }

    console.log("createSubscription", subscription);

    return await startRequest(
      ApiEndpoints.subscriptions,
      "post",
      abortController,
      subscription,
    );
  }

  async function updateSubscription(subscription, abortController) {
    if (!subscription) {
      throw new Error("Invalid subscription");
    }

    console.log("updateSubscription", subscription);

    return await startRequest(
      ApiEndpoints.subscription(subscription._id),
      "put",
      abortController,
      subscription,
    );
  }

  async function deleteSubscription(id, abortController) {
    if (!id) {
      throw new Error("Invalid subscription ID");
    }

    return await startRequest(
      ApiEndpoints.subscription(id),
      "delete",
      abortController,
    );
  }

  return {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription,
  };
}
