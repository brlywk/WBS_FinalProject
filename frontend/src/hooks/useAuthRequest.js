import { useAuth } from "@clerk/clerk-react";

export default function useAuthRequest() {
  const { getToken } = useAuth();

  async function startRequest(url, method, abortController, body = {}) {
    if (!method || !url || !abortController) {
      console.log(
        "Method:",
        method,
        "URL:",
        url,
        "Abort Controller",
        abortController,
      );
      throw new Error("Invalid arguments");
    }

    const requestMethod = method.toUpperCase();

    const token = await getToken();

    const options = {
      method: requestMethod,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: abortController.signal,
    };

    if (body && Object.keys(body).length > 0) {
      options.body = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json";
    }

    try {
      const result = await fetch(url, options);

      if (!result.ok) {
        throw new Error("Request failed");
      }

      // In case of creation of something we need to check status and give back location
      if (result.status === 201) {
        return { successful: true, message: result.headers.get("Location") };
      }

      // we deleted something and deletion was successful
      if (result.status === 204) {
        return { successful: true, message: "Deleted" };
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
