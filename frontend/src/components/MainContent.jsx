import SubscriptionCard from "../components/SubscriptionCard";

// MainContent component
export default function MainContent({ subscriptions }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {" "}
      {/* No changes needed here */}
      {subscriptions?.length > 0 &&
        subscriptions.map((sub) => (
          <SubscriptionCard key={sub._id} subscription={sub} />
        ))}
    </div>
  );
}
