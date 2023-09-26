import ApiEndpoints from "../utils/ApiEndpoints";
import useAuthRequest from "./useAuthRequest";

export default function useCategory() {
  const { startRequest } = useAuthRequest();

  async function getAllCategories(abortController) {
    return await startRequest(ApiEndpoints.categories, "get", abortController);
  }

  async function getUsedCategories(abortController) {
    return await startRequest(
      ApiEndpoints.usedCategories,
      "get",
      abortController,
    );
  }

  async function getCategoryById(id, abortController) {
    return await startRequest(
      ApiEndpoints.category(id),
      "get",
      abortController,
    );
  }

  return { getAllCategories, getCategoryById, getUsedCategories };
}
