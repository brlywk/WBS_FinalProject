// Stats.jsx
import StatsCard from './StatsCard';

// Dummy data for subscriptions
const subscriptions = [
  { name: 'Subscription 1', price: '$10' },
  { name: 'Subscription 2', price: '$20' },
  { name: 'Subscription 3', price: '$30' },
];

export default function Stats() {
  const totalSubscriptions = subscriptions.length;
  const totalCost = subscriptions.reduce((total, sub) => total + parseFloat(sub.price.replace('$', '')), 0);

  return (
    <div className="stats flex justify-center space-x-4 mb-4">
        <StatsCard className="text-sm" title="Total Subscriptions" value={totalSubscriptions} />
        <StatsCard className="text-sm" title="Total Cost" value={`$${totalCost.toFixed(2)}`} />  
        <StatsCard className="text-sm" title="Potential Savings" value="$50" />
        <StatsCard className="text-sm" title="Most Used" value="Product 2" />
    </div>
  );
}