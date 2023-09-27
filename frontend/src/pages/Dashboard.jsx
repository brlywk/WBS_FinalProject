import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

import SubscriptionForm from "../components/SubscriptionForm"; // Import AddSubscriptionForm component
import ErrorDisplay from "../components/ErrorDisplay";
import Loading from "../components/Loading";
import MainContent from "../components/MainContent";
import SearchModal from "../components/SearchModal"; // Import SearchModal component
import Sidebar from "../components/Sidebar";
import SidebarTop from "../components/SidebarTop";
import Stats from "../components/Stats"; // Import Stats component
import SubscriptionList from "../components/SubscriptionList"; // Import SubscriptionList component
import OverviewStat from "../components/OverviewStat"; // Import BarChart component

import useDataFetching from "../hooks/useDataFetching";
import eventEmitter from "../utils/EventEmitter";
import { useDataContext } from "../contexts/dataContext";
import Notifications from "../components/Notifications";

function Dashboard() {
  // ---- CONTEXT ----
  const {
    subscriptions,
    allCategories,
    usedCategories,
    // usages,
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
  const { firstName } = useUser();

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

  function notificationClickedCallback(id) {
    alert(
      `Notification with ID ${id} has been clicked. Something should happen!`,
    );
  }

  // DEBUG LOGGING
  console.log("Subscriptions", subscriptions);
  console.log("allCategories", allCategories);
  console.log("usedCategories", usedCategories);
  // console.log("Usages", usages);
  console.log("dashboardData", dashboardData);

  // ---- THE ALMIGHTY USE EFFECT ----
  useEffect(() => {
    const abortController = new AbortController();

    // Need this one in here for the abort controller
    function refetchCallback() {
      refetchData(abortController);
    }

    // Same with this
    function notificationReadCallback(id) {
      alert(`Notification with ID ${id} should be marked as read!`);
    }

    // register event listeners
    eventEmitter.on("refetchData", refetchCallback);
    eventEmitter.on("openSubscriptionForm", openSubscriptionFormCallback);
    eventEmitter.on("changeFormMode", switchFormModeCallback);
    eventEmitter.on("markNotificationAsRead", notificationReadCallback);
    eventEmitter.on("notificationClicked", notificationClickedCallback);

    return () => {
      abortController.abort();
      eventEmitter.off("refetchData", refetchCallback);
      eventEmitter.off("openSubscriptionForm", openSubscriptionFormCallback);
      eventEmitter.off("changeFormMode", switchFormModeCallback);
      eventEmitter.off("markNotificationAsRead", notificationReadCallback);
      eventEmitter.off("notificationClicked", notificationClickedCallback);
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
      Object.keys(dashboardData).length > 0;

    return loadingSuccessful;
  }

  // Main return block for the Dashboard component
  return (
    <div className="apple-bg h-screen w-screen">
      {loading && <Loading />}

      {!loading && error && <ErrorDisplay message={errorMessage} />}

      {!loading && !error && checkDataLoadingSuccessful() && (
        <div className="flex flex-grow flex-col items-center p-4">
          {/* Top bar with logo and search */}
          <div className="flex w-3/5 flex-grow flex-row items-center justify-between gap-4">
            {/* Logo */}
            <img src="/subzero_logo_icon.png" className="h-7 w-7" alt="Logo" />

            {/* Search Bar */}
            <div className="flex w-full justify-center">
              <SearchModal />
            </div>
          </div>

          {/* App content */}
          <div className="flex w-3/5 flex-grow flex-row items-center justify-between gap-4">
            <div className="col-start-2 pt-8">
              <div className="flex flex-grow flex-col divide-y divide-black/25 rounded-lg border border-black/25 bg-gray-200/25 shadow-lg backdrop-blur">
                {/* Title Bar */}
                <div className="flex items-center gap-4 p-4">
                  {/* Title */}
                  <div className="w-full text-lg font-bold uppercase">
                    Hello, {firstName}
                  </div>

                  {/* Notification */}
                  <Notifications />

                  {/* User Icon */}
                  <UserButton />
                </div>

                {/* Content Area */}
                <div className="flex w-full flex-grow flex-row divide-x divide-black/25">
                  {/* Sidebar Content */}
                  <div className="flex flex-grow flex-col divide-y divide-black/25">
                    {/* Add Subscription Button */}
                    <div className="p-1 flex justify-center">
                      <button
                        onClick={handleAddSubscriptionClick}
                        className="cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-r from-black to-gray-500 text-white text-base border-none rounded-lg px-5 py-3 outline-none hover:from-gray-500 hover:to-black hover:scale-110 transform-gpu w-full mx-2"
                      >
                        Add Subscription
                      </button>
                    </div>

                    {/* Overview, Recommendations, Cancel */}
                    <SidebarTop className="w-full p-2" />

                    {/* Categories */}
                    <Sidebar className="" />
                  </div>

                  {/* Main Content */}
                  <div className=" bg-white/25">
                    {/* Main Dashboard View */}
                    {!pageId && (
                      <div className="grid  gap-4">
                        <Stats />
                        <OverviewStat />
                        <SubscriptionList />
                      </div>
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
    </div>
  );
}

export default Dashboard;



