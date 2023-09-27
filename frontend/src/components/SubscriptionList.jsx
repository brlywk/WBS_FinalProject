import eventEmitter from "../utils/EventEmitter";
import { useDataContext } from "../contexts/dataContext";
import { useState } from "react";

export default function SubscriptionList() {
  const { subscriptions } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Check if subscriptions is an array before mapping over it
  if (!Array.isArray(subscriptions)) {
    console.error("Subscriptions is not an array");
    return null;
  }

  const handleSubscriptionClick = (subscription) => {
    eventEmitter.emit("openSubscriptionForm", subscription, "show");
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(subscriptions?.length / itemsPerPage);

  // Get the subscriptions for the current page
  const currentSubscriptions = subscriptions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-4 px-4">
      {currentSubscriptions?.map((subscription) => (
        <div
          key={subscription?._id}
          className="flex cursor-pointer items-center rounded-md border border-gray-200 p-2 hover:bg-white hover:bg-opacity-25"
          onClick={() => handleSubscriptionClick(subscription)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </div>
          <div className="ml-[10px] flex flex-grow items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none">
                {subscription.name}
              </p>
              <p className="text-xs text-gray-500">
                {subscription.active ? "Active" : "Inactive"}
              </p>
            </div>
            <div>
              <p className="font-medium">€{subscription.price}</p>
              <p className="text-xs text-gray-500">
                {subscription.interval === "month" ? "Monthly " : "Yearly"}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="join flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            className={`join-item btn ${
              currentPage === i + 1 ? "btn-active" : ""
            } bg-gray-300 rounded-md p-2`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
