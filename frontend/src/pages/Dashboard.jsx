import { useEffect, useState } from "react";
import { UserButton } from "@clerk/clerk-react";

import SubscriptionForm from "../components/SubscriptionForm"; // Import AddSubscriptionForm component
import ErrorDisplay from "../components/ErrorDisplay";
import Loading from "../components/Loading";
import MainContent from "../components/MainContent";
import SearchModal from "../components/SearchModal"; // Import SearchModal component
import Sidebar from "../components/Sidebar";
import SidebarTop from "../components/SidebarTop";
import Stats from "../components/Stats"; // Import Stats component
import TabNavigation from "../components/TabNavigation";

import useSubscription from "../hooks/useSubscription";
import useDashboard from "../hooks/useDashboard";
import useCategory from "../hooks/useCategory";

function Dashboard() {
  // ---- STATE ----
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false);
  const [isTestShowSub, setTestShowSub] = useState(false);

  const [dashboardData, setDashboardData] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [categories, setCategories] = useState(null);

  // ---- CUSTOM HOOKS ----
  const { getAllSubscriptions } = useSubscription();
  const { getDashboardData } = useDashboard();
  const { getAllCategories } = useCategory();

  useEffect(() => {
    const abortController = new AbortController();

    setLoading(true);
    setError(false);
    setErrorMessage("");

    async function fetchData() {
      try {
        const [subs, dashData, cats] = await Promise.all([
          getAllSubscriptions(abortController),
          getDashboardData(abortController),
          getAllCategories(abortController),
        ]);

        setDashboardData(dashData);
        setSubscriptions(subs);
        setCategories(cats);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      }
      setLoading(false);
      setErrorMessage("");
    }

    fetchData();

    return () => abortController.abort();
  }, []);

  // We need to refetch after all operations...
  async function refetchData() {
    const abortController = new AbortController();
    setLoading(true);
    setSubscriptions(null);
    setDashboardData(null);
    setError(false);
    setErrorMessage("");

    try {
      const [subs, dashData] = await Promise.all([
        getAllSubscriptions(abortController),
        getAllCategories(abortController),
      ]);
      setDashboardData(dashData);
      setSubscriptions(subs);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
      setErrorMessage("");
    }
  }

  // TODO: Right now this always refetches when the form closes... \
  // We need to add a way to check if a subscription has actually been added
  function handleSubscriptionAdded() {
    setIsAddSubscriptionOpen(false);

    refetchData();
  }

  // Main return block for the Dashboard component
  return (
    // The main container with fixed positioning and semi-transparent background
    
    <div className="overlay-app">
                  {/* Search Modal */}
                  <SearchModal className="w-72" />
      <div className="flex justify-center">
        <div className="absolute inset-0 bg-gray-900/70 -z-10 backdrop-blur rounded-lg bg-white/25"></div>
        <div className="relative w-[1024px] h-[701.22px] rounded-lg border border-transparent bg-white/10 p-6 backdrop-blur light-mode">
          {/* Header */}
          {/* Header with flex layout, centered items, space between items, specific height, bottom border, and semi-transparent gray border color */}
          <header className="flex items-center justify-between h-16 border-b bo">
            {/* Dashboard title */}
            <h1 className="text-xl font-bold">DASHBOARD</h1> {/* Increased font size and weight for better legibility */}
            {/* Notifications */}
            {/* Notifications with relative positioning */}
            <div className="relative">
              {/* Placeholder for the notifications */}
              <div className="h-10 w-32 rounded-lg bg-gray-300"></div>
              {/* Container for the notification icon and count */}
              <div className="absolute right-14 top-0 flex flex-col items-start gap-y-1">
                {/* Notification icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  {/* SVG paths go here */}
                </svg>
                {/* Notification count */}
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                  <p className="text-xs text-white">3</p>
                </div>

                {/* User Icon */}
                <UserButton />
              </div>

              {/* Content Area */}
              <div className="flex w-full flex-row divide-x divide-black/25">
                {/* Sidebar Content */}
                <div className="flex flex-col divide-y divide-black/25">
                  {/* Add Subscription Button */}
                  <button
                    onClick={() => setIsAddSubscriptionOpen(true)}
                    className="bg-black/25 p-4 hover:bg-black hover:text-white"
                  >
                    Add Subscription
                  </button>

                  {/* Overview, Recommendations, Cancel */}
                  <SidebarTop className="w-full p-2" />

                  {/* Categories */}
                  <Sidebar categories={categories} className="w-full p-2" />
                </div>

                {/* Main Content */}
                <div className="w-full bg-white/25">
                  {loading && <Loading />}

                  {!loading && error && <ErrorDisplay message={errorMessage} />}

                  {!loading &&
                    !error &&
                    dashboardData &&
                    categories?.length > 0 &&
                    subscriptions?.length > 0 && (
                      <TabNavigation
                        tabs={[
                          {
                            name: "Dashboard",
                            element: (
                              <div className="grid w-full gap-4">
                                <Stats
                                  dashboardData={dashboardData}
                                  totalSubscriptions={subscriptions.length}
                                />
                                <MainContent
                                  subscriptions={subscriptions}
                                  categories={categories}
                                />
                              </div>
                            ),
                          },
                          {
                            name: "Active",
                            element: (
                              <MainContent
                                subscriptions={subscriptions}
                                categories={categories}
                                filter="active"
                              />
                            ),
                          },
                          {
                            name: "Inactive",
                            element: (
                              <MainContent
                                subscriptions={subscriptions}
                                categories={categories}
                                filter="inactive"
                              />
                            ),
                          },
                          {
                            name: "Usage",
                            element: <div>Usage</div>,
                          },
                        ]}
                      />
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Add Form */}
      {categories?.length > 0 && (
        <SubscriptionForm
          mode="add"
          categories={categories}
          opened={isAddSubscriptionOpen}
          onClose={handleSubscriptionAdded}
        />
      )}
    </>
  );
}

export default Dashboard;
