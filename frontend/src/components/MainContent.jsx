import SubscriptionCard from "../components/SubscriptionCard";
import { useDataContext } from "../contexts/dataContext";
import { Navigate } from "react-router-dom";

// MainContent component
export default function MainContent({ filter = "none" }) {
  const { subscriptions } = useDataContext();

  const filteredSubscriptions = () => {
    if (filter === "none") {
      return subscriptions;
    }

    if (filter === "active") {
      return subscriptions?.filter((sub) => sub.active);
    }

    if (filter === "inactive") {
      return subscriptions?.filter((sub) => !sub.active);
    }

    // Filter by pageId
    return subscriptions?.filter((sub) => sub.category._id === filter);
  };

  return (
    <div className="grid grid-cols-3 gap-10">
      {/* No changes needed here */}
      {filteredSubscriptions()?.length > 0 &&
        filteredSubscriptions().map((sub) => (
          <SubscriptionCard key={sub._id} subscription={sub} />
        ))}

      {/* Prevent edits from resulting in an empty category -> Redirect to Main */}
      {filteredSubscriptions()?.length === 0 && <Navigate to="/dashboard" />}
    </div>
  );
}
