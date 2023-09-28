import ApiEndpoints from "../utils/ApiEndpoints";
import useAuthRequest from "./useAuthRequest";

export default function useDashboard() {
  const { startRequest } = useAuthRequest();

  /**
   * Returns dashboard data for the current user
   */
  async function getDashboardData(abortController) {
    return await startRequest(ApiEndpoints.dashboard, "get", abortController);
  }

  /**
   * Returns users most used subscription
   */
  async function getMostUsedSubscription(abortController) {
    return await startRequest(
      ApiEndpoints.mostUsedSubscription,
      "get",
      abortController,
    );
  }

  /**
   * Returns users potential monthly savings
   */
  async function getPotentialMonthlySavings(abortController) {
    return await startRequest(
      ApiEndpoints.potentialMonthlySavings,
      "get",
      abortController,
    );
  }

  /**
   * Returns total monthly cost of all subscriptions
   */
  async function getTotalMonthlyCost(abortController) {
    return await startRequest(
      ApiEndpoints.totalMonthlyCost,
      "get",
      abortController,
    );
  }

  return {
    getDashboardData,
    getMostUsedSubscription,
    getPotentialMonthlySavings,
    getTotalMonthlyCost,
  };
}
