import { useEffect, useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

import SubscriptionForm from "../components/SubscriptionForm"; // Import AddSubscriptionForm component
import ErrorDisplay from "../components/ErrorDisplay";
import Loading from "../components/Loading";
import MainContent from "../components/MainContent";
import SearchModal from "../components/SearchModal"; // Import SearchModal component
import Sidebar from "../components/Sidebar";
import SidebarTop from "../components/SidebarTop";
import Stats from "../components/Stats"; // Import Stats component
import TabNavigation from "../components/TabNavigation";
import UsageTab from "../components/UsageTab";

import useDataFetching from "../hooks/useDataFetching";
import eventEmitter from "../utils/EventEmitter";
import { useDataContext } from "../contexts/dataContext";

function Dashboard() {
  // ---- CONTEXT ----
  const {
    subscriptions,
    allCategories,
    usedCategories,
    usages,
    dashboardData,
  } = useDataContext();

  // ---- STATE ----
  const [subscriptionFormState, setSubscriptionFormState] = useState({
    mode: null,
    subscription: {},
    showForm: false,
  });

  // USAGE
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  // ---- CUSTOM HOOKS ----
  const { loading, error, errorMessage, refetchData } = useDataFetching();
  const { pageId } = useParams();

  // ---- Event Callbacks ----

  function openSubscriptionFormCallback(subscription, mode) {
    setSubscriptionFormState({
      mode,
      subscription,
      showForm: true,
    });
  }

  function switchFormModeCallback(mode) {
    setSubscriptionFormState((prev) => {
      return {
        ...prev,
        mode,
      };
    });
  }

  // DEBUG LOGGING
  console.log("Subscriptions", subscriptions);
  console.log("allCategories", allCategories);
  console.log("usedCategories", usedCategories);
  console.log("Usages", usages);
  console.log("dashboardData", dashboardData);

  // ---- THE ALMIGHTY USE EFFECT ----
  useEffect(() => {
    const abortController = new AbortController();

    // Need this one in here for the abort controller
    function refetchCallback() {
      refetchData(abortController);
    }

    // register event listeners
    eventEmitter.on("refetchData", refetchCallback);
    eventEmitter.on("openSubscriptionForm", openSubscriptionFormCallback);
    eventEmitter.on("changeFormMode", switchFormModeCallback);

    // TODO: more robust implementation
    document.body.style.background =
      "linear-gradient(to right, #f5f3f4, #3b82f6, #800080, #f5f3f4), radial-gradient(circle at 2% 5%, #f5f3f4, #3b82f6, #800080, #f5f3f4)";
    document.body.style.backgroundSize = "500% 500%, 100% 100%";
    document.body.style.animation = "gradient 60s ease infinite";

    return () => {
      abortController.abort();
      eventEmitter.off("refetchData", refetchCallback);
      eventEmitter.off("openSubscriptionForm", openSubscriptionFormCallback);
      eventEmitter.off("changeFormMode", switchFormModeCallback);
    };
  }, []);

  // ---- MORE FUNCTIONS ----
  // open subscription form with an empty subscription
  function handleAddSubscriptionClick() {
    setSubscriptionFormState({
      mode: "add",
      subscription: {},
      showForm: true,
    });
  }

  // quick helper function to keep JSX less cluttered
  function checkDataLoadingSuccessful() {
    const loadingSuccessful =
      subscriptions?.length >= 0 &&
      usedCategories?.length >= 0 &&
      allCategories?.length >= 0 &&
      Object.keys(dashboardData).length > 0 &&
      usages?.length >= 0;

    return loadingSuccessful;
  }

  // Main return block for the Dashboard component
  return (
    <>
      {loading && <Loading />}

      {!loading && error && <ErrorDisplay message={errorMessage} />}

      {!loading && !error && checkDataLoadingSuccessful() && (
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
                      onClick={handleAddSubscriptionClick}
                      className="rounded bg-black p-4 text-white hover:bg-black hover:text-white"
                    >
                      Add Subscription
                    </button>

                    {/* Overview, Recommendations, Cancel */}
                    <SidebarTop className="w-full p-2" />

                    {/* Categories */}
                    <Sidebar className="" />
                  </div>

                  {/* Main Content */}
                  <div className="w-full bg-white/25">
                    {/* Main Dashboard View */}
                    {!pageId && (
                      <TabNavigation
                        tabs={[
                          {
                            name: "Dashboard",
                            element: (
                              <div className="grid w-full gap-4">
                                <Stats />
                                <MainContent />
                              </div>
                            ),
                          },
                          {
                            name: "Active",
                            element: <MainContent filter="active" />,
                          },
                          {
                            name: "Inactive",
                            element: <MainContent filter="inactive" />,
                          },
                          {
                            name: "Usage",
                            element: <UsageTab openModal={openModal} />,
                          },
                        ]}
                      />
                    )}

                    {/* Recommendations / Cancel */}
                    {(pageId === "recommendations" || pageId === "cancel") && (
                      <TabNavigation
                        tabs={[
                          {
                            name: "Recommendations",
                            element: (
                              <div className="w-full">Recommendations</div>
                            ),
                          },
                          {
                            name: "Cancel",
                            element: (
                              <div className="w-full">Recommendations</div>
                            ),
                          },
                        ]}
                        initialTabIndex={pageId === "recommendations" ? 0 : 1}
                      />
                    )}

                    {/* Category Pages */}
                    {pageId &&
                      pageId !== "recommendations" &&
                      pageId !== "cancel" && <MainContent filter={pageId} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Add Form */}
      {!loading && !error && checkDataLoadingSuccessful() && (
        <SubscriptionForm
          mode={subscriptionFormState.mode}
          subscription={subscriptionFormState.subscription}
          opened={subscriptionFormState.showForm}
          onClose={() =>
            setSubscriptionFormState((prev) => {
              return { ...prev, showForm: false };
            })
          }
        />
      )}
    </>
  );
}

export default Dashboard;
