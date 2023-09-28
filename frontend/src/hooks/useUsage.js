import ApiEndpoints from "../utils/ApiEndpoints";
import useAuthRequest from "./useAuthRequest";

export default function useUsage() {
  const { startRequest } = useAuthRequest();

  async function getAllUsages(abortController) {
    return await startRequest(ApiEndpoints.usages, "get", abortController);
  }

  async function getUsageById(id, abortController) {
    return await startRequest(ApiEndpoints.usage(id), "get", abortController);
  }

  async function createUsage(usage, abortController) {
    return await startRequest(
      ApiEndpoints.usages,
      "post",
      abortController,
      usage,
    );
  }

  return { getAllUsages, getUsageById, createUsage };
}
