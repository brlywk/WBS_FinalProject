import { useState } from "react";
import { useDataContext } from "../contexts/dataContext";
import eventEmitter from "../utils/EventEmitter";
import SubscriptionListCard from "./SubscriptionListCard";
import { filterByCategory } from "../utils/filterHelper";

export default function SubscriptionList({
  itemsPerPage = 3,
  categoryId = null,
}) {
  const { subscriptions } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const filteredSubscriptions = filterByCategory(subscriptions, categoryId);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);

  // Get the subscriptions for the current page
  const currentSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-4">
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
      <div className="flex justify-center space-x-2 bg-opacity-50 py-4">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, i) => (
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
