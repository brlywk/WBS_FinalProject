import ApiEndpoints from "../utils/ApiEndpoints";
import useAuthRequest from "./useAuthRequest";

export default function useNotifications() {
  const { startRequest } = useAuthRequest();

  /**
   * Returns all unsent notifications for current user
   * @return {Array} notifications
   */
  async function getAllNotifications(abortController) {
    return await startRequest(
      ApiEndpoints.notifications,
      "get",
      abortController,
    );
  }

  /**
   * Returns an updated notification that has been set inactive
   */
  async function getAndUpdateNotificationById(id, abortController) {
    return await startRequest(
      ApiEndpoints.notificationById(id),
      "get",
      abortController,
    );
  }

  return { getAllNotifications, getAndUpdateNotificationById };
}
