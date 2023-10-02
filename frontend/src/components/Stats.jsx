import StatsCard from "./StatsCard";
import { useDataContext } from "../contexts/dataContext";

export default function Stats({ columns = 4, height = "h-[10vh]" }) {
  const { subscriptions, dashboardData } = useDataContext();

  if (!Object.keys(dashboardData).length > 0) return;
  const totalSubscriptions = subscriptions?.length ?? 0;

  return (
    // <div className="grid grid-cols-4 gap-2">
    <div className={`${height} grid grid-cols-${columns} gap-2`}>
      <StatsCard className="text-sm" title="Total Subscriptions">
        {totalSubscriptions}
      </StatsCard>
      <StatsCard className="text-sm" title="Total Cost">
        {`EUR ${dashboardData.totalCostPerMonth.toFixed(2)}`}
      </StatsCard>
      <StatsCard className="text-sm" title="Potential Savings">
        {`EUR ${dashboardData.potentialMonthlySavings.toFixed(2)}`}
      </StatsCard>
      <StatsCard className="text-sm" title="Most Used">
        {dashboardData.mostUsed.name || "Insufficient Data"}
      </StatsCard>
    </div>
  );
}
