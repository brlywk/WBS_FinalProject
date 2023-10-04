import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

import ErrorDisplay from "../components/ErrorDisplay";
import Loading from "../components/Loading";
import Notifications from "../components/Notifications";
import OverviewStat from "../components/OverviewStat"; // Import BarChart component
import Recommendations from "../components/Recommendations";
import SearchModal from "../components/SearchModal"; // Import SearchModal component
import Sidebar from "../components/Sidebar";
import SidebarTop from "../components/SidebarTop";
import Stats from "../components/Stats"; // Import Stats component
import SubscriptionForm from "../components/SubscriptionForm"; // Import AddSubscriptionForm component
import SubscriptionList from "../components/SubscriptionList"; // Import SubscriptionList component
import UsageModal from "../components/UsageModal";
import CategoryPage from "./CategoryPage";

import { useDataContext } from "../contexts/dataContext";
import useCategory from "../hooks/useCategory";
import useDashboard from "../hooks/useDashboard";
import useDataFetching from "../hooks/useDataFetching";
import useNotifications from "../hooks/useNotifications";
import useSubscription from "../hooks/useSubscription";
import useUsage from "../hooks/useUsage";
import eventEmitter from "../utils/EventEmitter";
import getGreeting from "../utils/greetings.js";
import { createUsageBody } from "../utils/schemaBuilder";
import UsagePage from "../components/UsagePage";

function Dashboard() {
  // ---- PAGE INFORMATION ----
  const { pageId } = useParams();
  const {
    user: { firstName },
  } = useUser();

  // ---- CONTEXT ----
  const {
    subscriptions,
    setSubscriptions,
    allCategories,
    usedCategories,
    setUsedCategories,
    dashboardData,
    setDashboardData,
    setNotifications,
  } = useDataContext();

  // ---- STATE ----
  const [subscriptionFormState, setSubscriptionFormState] = useState({
    mode: null,
    subscription: {},
    showForm: false,
  });
  const [usageModalState, setUsageModalState] = useState({
    showForm: false,
    notificationId: null,
  });

  // ---- CUSTOM HOOKS ----
  const { loading, error, errorMessage, refetchData } = useDataFetching();
  const { createUsage } = useUsage();
  const { getAllSubscriptions } = useSubscription();
  const { getUsedCategories } = useCategory();
  const { getDashboardData } = useDashboard();
  const { getAllNotifications, getAndUpdateNotificationById } =
    useNotifications();

  // ---- Event Callbacks ----
  // show subscription form
  function openSubscriptionFormCallback(subscription, mode) {
    setSubscriptionFormState({
      mode,
      subscription,
      showForm: true,
    });
  }

  // Switch Edit mode for subscription form
  function switchFormModeCallback(mode) {
    setSubscriptionFormState((prev) => {
      return {
        ...prev,
        mode,
      };
    });
  }

  // Notification has been clicked, show usageModal
  function notificationClickedCallback(id) {
    setUsageModalState({ showForm: true, notificationId: id });
  }

  // ---- THE ALMIGHTY USE EFFECT ----
  useEffect(() => {
    const abortController = new AbortController();
    const notificationAbortController = new AbortController();

    // Unfortunately, every time we add usage data we need to sneakily refetch almost
    // all data, as otherwise our application doesn't show the current state of data *buuuuuuh!*
    async function sneakyDataRefetch() {
      try {
        const [
          updatedSubscriptions,
          updatedUsedCategories,
          updatedDashboardData,
          updatedNotifications,
        ] = await Promise.all([
          getAllSubscriptions(abortController),
          getUsedCategories(abortController),
          getDashboardData(abortController),
          getAllNotifications(abortController),
        ]);

        setSubscriptions(updatedSubscriptions);
        setUsedCategories(updatedUsedCategories);
        setDashboardData(updatedDashboardData);

        // HACK: For some reason, all data is correctly refetched, but a single notification
        // keeps getting stuck in context... so remove notification if all that's coming back is
        // just one...
        if (updatedNotifications?.length === 1) {
          setNotifications([]);
        } else {
          setNotifications(updatedNotifications);
        }
      } catch (error) {
        console.error(`Error refetching subscriptions: ${errorMessage}`);
      }
    }

    // Rerequest notifications only, as re-rendering the whole UI for removing a notification
    // seems pretty excessive
    async function refetchNotifications() {
      try {
        const notifications = await getAllNotifications(
          notificationAbortController,
        );
        setNotifications(notifications);
      } catch (error) {
        console.error(`Error refetching notifications: ${errorMessage}`);
      }
    }

    // creating new usage data
    async function createUsageData(subscriptionId, score) {
      try {
        const usageBody = createUsageBody(subscriptionId, score);

        await createUsage(usageBody, abortController);
      } catch (error) {
        console.error(`Error creating usage data: ${errorMessage}`);
      }
    }

    // dismissing a single notification as read
    // TODO: With this, a user can skip feedback for usage, but if we don't want to allow
    // this we would probably need to remove the 'mark as read' option...
    async function updateNotification(notificationId) {
      try {
        // TODO: Check what this actually returns ...
        const updateNotification = await getAndUpdateNotificationById(
          notificationId,
          abortController,
        );

        refetchNotifications();
      } catch (error) {
        console.error(`Error creating usage data: ${errorMessage}`);
      }
    }

    // All event handlers that require backend communcation need to be
    // inside the use effect because we need the abortionController
    // TODO: We could create a new controller withint the event handler maybe?

    // Need this one in here for the abort controller
    function refetchCallback() {
      refetchData(abortController);
    }

    // mark a single notification as read
    function notificationReadCallback(id) {
      updateNotification(id);
    }

    // Create new usage Data and mark notification this feedback came from as read
    function usageScoreSelectedCallback(subscriptionId, score) {
      // create usage data
      createUsageData(subscriptionId, score);

      // unfortunately we also need to refetch all subscriptions this way as otherwise
      // we sit on stale usage data for our just updated subscription
      sneakyDataRefetch();

      // refetch notifications
      // refetchNotifications();

      // NOTE: We don't need to mark a notification as read here, as every posted usage data
      // invalidates all notifications associated with a single subscription
    }

    // register event listeners
    eventEmitter.on("refetchData", refetchCallback);
    eventEmitter.on("openSubscriptionForm", openSubscriptionFormCallback);
    eventEmitter.on("changeFormMode", switchFormModeCallback);
    eventEmitter.on("markNotificationAsRead", notificationReadCallback);
    eventEmitter.on("notificationClicked", notificationClickedCallback);
    eventEmitter.on("useScoreSelected", usageScoreSelectedCallback);

    return () => {
      abortController.abort();
      notificationAbortController.abort();
      eventEmitter.off("refetchData", refetchCallback);
      eventEmitter.off("openSubscriptionForm", openSubscriptionFormCallback);
      eventEmitter.off("changeFormMode", switchFormModeCallback);
      eventEmitter.off("markNotificationAsRead", notificationReadCallback);
      eventEmitter.off("notificationClicked", notificationClickedCallback);
      eventEmitter.off("useScoreSelected", usageScoreSelectedCallback);
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
        <div className="flex w-full flex-grow flex-col items-center p-4">
          {/* Top bar with logo and search */}
          <div className="flex w-3/5 flex-grow flex-row items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/dashboard">
              <img
                src="/subzero_logo_icon.png"
                className="h-7 w-7"
                alt="Logo"
              />
            </Link>

            {/* Search Bar */}
            <div className="flex w-full justify-center">
              <SearchModal />
            </div>
          </div>

          {/* App content */}
          <div className="flex w-3/5 flex-grow flex-row items-center justify-between gap-4">
            <div className="w-full pt-8">
              <div className="flex max-h-[86vh] min-h-[86vh] w-full flex-grow flex-col divide-y divide-black/25 rounded-lg border border-black/25 bg-gray-300/25 shadow-xl backdrop-blur">
                {/* Title Bar */}
                <div className="flex items-center gap-4 p-4">
                  {/* Title */}
                  <div className="w-full text-lg font-bold uppercase">
                    {getGreeting(firstName)}
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
                    <div className="flex justify-center p-1">
                      <button
                        onClick={handleAddSubscriptionClick}
                        className="mx-2 w-full transform-gpu cursor-pointer rounded-lg border-none bg-gradient-to-r from-black to-gray-500 px-5 py-3 text-base text-white outline-none transition-all duration-300 ease-in-out hover:scale-105 hover:from-gray-500 hover:to-black hover:shadow-lg"
                      >
                        Add Subscription
                      </button>
                    </div>

                    {/* Overview, Recommendations, Cancel */}
                    <SidebarTop className="w-full p-2" />

                    {/* Categories */}
                    <Sidebar className="p-2" />
                  </div>

                  {/* Main Content */}
                  <div className="w-full rounded-br-lg bg-white/25 p-2">
                    {/* Main Dashboard View */}
                    {!pageId && (
                      <div className="grid h-full grid-rows-[max-content_max-content_1fr] gap-4">
                        <Stats />
                        <OverviewStat />
                        <SubscriptionList />

                        {/* No subscriptions added yet */}
                        {subscriptions?.length === 0 && (
                          <div className="flex items-center justify-center pb-8 text-gray-700">
                            <span className="mr-2">
                              Welcome! Why not get started by{" "}
                            </span>
                            <button
                              className="underline"
                              onClick={() =>
                                eventEmitter.emit(
                                  "openSubscriptionForm",
                                  {},
                                  "add",
                                )
                              }
                            >
                              adding your first subscription
                            </button>
                            ? 👍
                          </div>
                        )}
                      </div>
                    )}

                    {/* Recommendations / Cancel */}
                    {pageId === "recommendations" && <Recommendations />}

                    {/* Usage Page */}
                    {pageId === "usage" && <UsagePage />}

                    {/* Category Pages */}
                    {pageId &&
                      pageId !== "recommendations" &&
                      pageId !== "usage" && (
                        <CategoryPage categoryId={pageId} />
                      )}
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

      {/* Usage Modal */}
      <UsageModal
        opened={usageModalState.showForm}
        notificationId={usageModalState.notificationId}
        onClose={() =>
          setUsageModalState((prev) => {
            return { ...prev, showForm: false };
          })
        }
      />
    </div>
  );
}

export default Dashboard;
