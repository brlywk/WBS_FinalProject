import { useEffect, useState } from "react";
import { useDataContext } from "../contexts/dataContext";
import useDataFetching from "../hooks/useDataFetching";
import useNotifications from "../hooks/useNotifications";
import useUsage from "../hooks/useUsage";
import eventEmitter from "../utils/EventEmitter";

import { createUsageBody } from "../utils/schemaBuilder";

function ApiTestChild() {
  return (
    <div>
      <h1 className="mt-4 text-xl">
        I am a child component and will send an event to request a refetch!
      </h1>
      <div>
        <button
          onClick={() => eventEmitter.emit("refetchData")}
          className="rounded border-black bg-white/25 p-4 hover:bg-blue-300"
        >
          Request a refetch from parent component!
        </button>
      </div>
    </div>
  );
}

export default function ApiTest() {
  // Context
  const {
    subscriptions,
    usedCategories,
    usages,
    dashboardData,
    allCategories,
  } = useDataContext();

  const { getAllNotifications } = useNotifications();
  const { createUsage } = useUsage();

  const { loading, errorMessage, error, refetchData } = useDataFetching();

  const [notifications, setNotifications] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    const refetchCallback = () => refetchData(abortController);

    eventEmitter.on("refetchData", refetchCallback);

    // notification test
    async function testGetNotifications() {
      try {
        const notifications = await getAllNotifications(abortController);
        setNotifications(notifications);
      } catch (error) {
        console.log(error);
      }
    }
    testGetNotifications();

    // test new usage creation
    // async function testCreateUsage() {
    //   const subId = "65118ff0669122bf1a8671b5";
    //
    //   try {
    //     const usageBody = createUsageBody(subId, 3);
    //
    //     const newUsage = await createUsage(usageBody, abortController);
    //     console.log(newUsage);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    // testCreateUsage();

    return () => {
      abortController.abort();
      eventEmitter.off("refetchData", refetchCallback);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ApiTestChild />
      <div>
        {loading && <div>Loading...</div>}
        {!loading && error && <div>Error: {errorMessage}</div>}
        <h1 className="mt-4 text-xl">Dashboard Data</h1>
        {!loading && !error && dashboardData && (
          <div className="text-xs">{JSON.stringify(dashboardData)}</div>
        )}
        <h1 className="mt-4 text-xl">Subscriptions</h1>
        {!loading && !error && subscriptions && (
          <div className="text-xs">{JSON.stringify(subscriptions)}</div>
        )}
        <h1 className="mt-4 text-xl">Used Categories</h1>
        {!loading && !error && usedCategories && (
          <div className="text-xs">{JSON.stringify(usedCategories)}</div>
        )}
        <h1 className="mt-4 text-xl">Usages</h1>
        {!loading && !error && usages && (
          <div className="text-xs">{JSON.stringify(usages)}</div>
        )}
        <h1 className="mt-4 text-xl">All Categories</h1>
        {!loading && !error && allCategories && (
          <div className="text-xs">{JSON.stringify(allCategories)}</div>
        )}
        <h1 className="mt-4 text-xl">Notificatons</h1>
        {notifications?.length > 0 && (
          <div className="text-xs">{JSON.stringify(notifications)}</div>
        )}
      </div>
    </div>
  );
}
