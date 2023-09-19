// SubscriptionCard.jsx
export default function SubscriptionCard({ title, price, status }) {
    return (
      <div className="p-4 rounded-lg bg-gray-100">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-600">{status}</p>
        <p className="text-lg font-semibold">{price}</p>
      </div>
    );
  }