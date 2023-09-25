import StatsCard from "./StatsCard";
import { useDataContext } from "../contexts/dataContext";

export default function Stats() {
  const { subscriptions, dashboardData } = useDataContext();

  if (!Object.keys(dashboardData).length > 0) return;
  const totalSubscriptions = subscriptions?.length ?? 0;

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
