import eventEmitter from "../utils/EventEmitter";
import { useDataContext } from "../contexts/dataContext";
import { useState } from "react";
import SubscriptionLogo from './SubscriptionLogos';

export default function SubscriptionList() {
  const { subscriptions, setEditMode, setSelectedSubscription } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Check if subscriptions is an array before mapping over it
  if (!Array.isArray(subscriptions)) {
    console.error("Subscriptions is not an array");
    return null;
  }

  const handleSubscriptionClick = (subscription) => {
    eventEmitter.emit("openSubscriptionForm", subscription, "show");
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(subscriptions.length / itemsPerPage);

  // Get the subscriptions for the current page
  const currentSubscriptions = subscriptions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4 px-2">
      {currentSubscriptions.map((subscription, index) => (
        <div 
          className="flex items-center hover:bg-white hover:bg-opacity-25 cursor-pointer border border-gray-200 rounded-md p-2 backdrop-blur" 
          key={subscription._id} 
          onClick={() => handleSubscriptionClick(subscription)}
        >
          <div className="h-9 w-9 rounded-full bg-gray-500 flex items-center justify-center">
            <SubscriptionLogo subscriptionName={subscription.name} />
          </div>
          <div className="flex-grow flex justify-between items-center ml-[10px]">  
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-none">{subscription.name}</p>
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
      <div className="join flex justify-center space-x-2 py-4 bg-opacity-50">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''} bg-gray-300 rounded-md p-2`} 
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

