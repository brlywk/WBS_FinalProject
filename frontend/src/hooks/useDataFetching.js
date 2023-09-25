import { useEffect, useState } from "react";
import { useDataContext } from "../contexts/dataContext";
import useCategory from "./useCategory";
import useDashboard from "./useDashboard";
import useSubscription from "./useSubscription";
import useSubscriptionUsage from "./useSubscriptionUsage";

export default function useDataFetching() {
  // ---- Data Context ----
  const {
    setSubscriptions,
    setAllCategories,
    setUsedCategories,
    setUsages,
    setDashboardData,
  } = useDataContext();

  // ---- Data Fetching ----
  const { getAllSubscriptions } = useSubscription();
  const { getAllCategories } = useCategory();
  const { getDashboardData } = useDashboard();
  const { getAllSubscriptionUsage } = useSubscriptionUsage();

  // ---- State ----
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allCategoriesFetched, setAllCategoriesFetched] = useState(false);

  // Fetch / Refetch function ----
  async function fetchData(abortController) {
    setLoading(true);
    setError(false);
    setErrorMessage("");

    // Fetch all the required data
    async function fetchRequiredData() {
      try {
        const [fetchedSubscriptions, fetchedDashboardData, fetchedUsages] =
          await Promise.all([
            getAllSubscriptions(abortController),
            getDashboardData(abortController),
            getAllSubscriptionUsage(abortController),
          ]);

        const fetchedUsedCategories = fetchedSubscriptions?.reduce(
          (prev, curr) => {
            if (!prev.some((category) => category._id === curr.category._id)) {
              prev.push(curr.category);
            }

            return prev;
          },
          [],
        );

        // write data to context
        setSubscriptions(fetchedSubscriptions);
        setDashboardData(fetchedDashboardData);
        setUsedCategories(fetchedUsedCategories);
        setUsages(fetchedUsages);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
    }
    await fetchRequiredData();

    // Fetch all categories once if needed
    async function fetchAllCategories() {
      try {
        const fetchedCategories = await getAllCategories(abortController);

        setAllCategoriesFetched(true);
        setAllCategories(fetchedCategories);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
    }

    if (!allCategoriesFetched) {
      await fetchAllCategories();
    }

    // ...aaaaaaand we're done
    setLoading(false);
  }

  useEffect(() => {
    // Probably not the best way, but let's use one abort controller for all fetching
    const abortController = new AbortController();

    fetchData(abortController);

    return () => abortController.abort();
  }, []);

  return { loading, error, errorMessage, refetchData: fetchData };
}
