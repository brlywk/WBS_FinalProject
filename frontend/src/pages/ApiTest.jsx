import { useEffect } from "react";
import { useDataContext } from "../contexts/dataContext";
import useDataFetching from "../hooks/useDataFetching";
import eventEmitter from "../utils/EventEmitter";

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

  const { loading, errorMessage, error, refetchData } = useDataFetching();

  useEffect(() => {
    const abortController = new AbortController();

    const refetchCallback = () => refetchData(abortController);

    eventEmitter.on("refetchData", refetchCallback);

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
      </div>
    </div>
  );
}
