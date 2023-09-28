import { useState } from "react";
import { useDataContext } from "../contexts/dataContext";
import eventEmitter from "../utils/EventEmitter";
import SubscriptionListCard from "./SubscriptionListCard";

export default function SubscriptionList() {
  const { subscriptions } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Check if subscriptions is an array before mapping over it
  if (!Array.isArray(subscriptions)) {
    console.error("Subscriptions is not an array");
    return null;
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(subscriptions?.length / itemsPerPage);

  // Get the subscriptions for the current page
  const currentSubscriptions = subscriptions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-4 px-2">
      {currentSubscriptions?.map((subscription, index) => (
        <SubscriptionListCard
          key={index}
          subscription={subscription}
          clickHandler={() =>
            eventEmitter.emit("openSubscriptionForm", subscription, "show")
          }
        />
      ))}

      {/* Pagination */}
      <div className="join flex justify-center space-x-2 bg-opacity-50 py-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
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
