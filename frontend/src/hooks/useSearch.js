import ApiEndpoints from "../utils/ApiEndpoints";
import useAuthRequest from "./useAuthRequest";

export default function useSearch() {
  const { startRequest } = useAuthRequest();

  async function startSearch(query, abortController) {
    query = encodeURIComponent(query);

    return await startRequest(
      ApiEndpoints.searchQuery(query),
      "get",
      abortController,
    );
  }

  return { startSearch };
}
