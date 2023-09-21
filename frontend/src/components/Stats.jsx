// Stats.jsx
import StatsCard from "./StatsCard";

export default function Stats({ totalSubscriptions, dashboardData }) {
  if (
    !dashboardData.totalCostPerMonth ||
    !dashboardData.potentialMonthlySavings ||
    !dashboardData.mostUsed.name ||
    !totalSubscriptions
  )
    return;

  return (
    <div className="flex items-center justify-around">
      <StatsCard
        className="text-sm"
        title="Total Subscriptions"
        value={totalSubscriptions}
      />
      <StatsCard
        className="text-sm"
        title="Total Cost"
        value={`EUR ${dashboardData.totalCostPerMonth.toFixed(2)}`}
      />
      <StatsCard
        className="text-sm"
        title="Potential Savings"
        value={`EUR ${dashboardData.potentialMonthlySavings.toFixed(2)}`}
      />
      <StatsCard
        className="text-sm"
        title="Most Used"
        value={dashboardData.mostUsed.name}
      />
    </div>
  );
}
