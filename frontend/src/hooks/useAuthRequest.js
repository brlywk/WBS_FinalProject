import { useAuth } from "@clerk/clerk-react";

export default function useAuthRequest() {
  const { getToken } = useAuth();

  async function startRequest(url, method, abortController, body = "") {
    if (!method || !url || !abortController) {
      throw new Error("Invalid arguments");
    }

    const token = await getToken();

    const options = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: abortController.signal,
    };

    if (body) {
      options.data = JSON.stringify(body);
    }
    try {
      const result = await fetch(url, options);
      if (!result.ok) {
        throw new Error("Request failed");
      }
      return await result.json();
    } catch (error) {
      if (error.name === "AbortError") {
        console.log(
          "Fetch was aborted. This could be due to React Strict mode double mounts.",
        );
        return;
      }
      throw new Error(error.message);
    }
  }

  return { startRequest };
}
