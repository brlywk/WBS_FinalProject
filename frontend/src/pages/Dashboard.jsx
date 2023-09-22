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
    <>
      <div className="flex h-full w-full flex-col items-center p-4">
        {/* Top bar with logo and search */}
        <div className="flex w-3/5 flex-row items-center justify-between gap-4">
          {/* Logo */}
          <img src="/subzero_logo_icon.png" className="h-7 w-7" alt="Logo" />

          {/* Search Bar */}
          <div className="flex w-full justify-center">
            <SearchModal />
          </div>
        </div>

        {/* App content */}
        <div className="flex w-3/5 flex-row items-center justify-between gap-4">
          <div className="col-start-2 pt-8">
            <div className="flex flex-col divide-y divide-black/25 rounded-lg border border-black/25 bg-gray-200/25 shadow-lg backdrop-blur">
              {/* Title Bar */}
              <div className="flex items-center gap-4 p-4">
                {/* Title */}
                <div className="w-full text-lg font-bold uppercase">
                  Dashboard
                </div>

                {/* Notification */}
                <div>
                  <div className="relative rounded-full border border-black/25 bg-white/25 p-1">
                    <div className="absolute bottom-0 right-0 flex h-4 w-4 translate-x-1 translate-y-1 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      2
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </div>
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
