import { useDataContext } from "../contexts/dataContext";
import StatsCard from "./StatsCard";

export default function Recommendations() {
  const { dashboardData, subscriptions } = useDataContext();

  const BarelyUsed = (
    <div className="">
      <span className="font-bold">
        {dashboardData?.barelyUsedMostExpensive.name}
      </span>{" "}
      <span className="font-normal">
        is low usage and high cost. Perhaps consider cancelling{" "}
        {dashboardData?.barelyUsedMostExpensive.name}.
      </span>
    </div>
  );

  const leastUsedSubs = subscriptions
    ?.filter((s) => s.score !== 0)
    .sort((a, b) => (a.score >= b.score ? 1 : -1))
    .splice(0, 4);
  const LeastUsed = (
    <div>
      {leastUsedSubs?.length > 0 &&
        leastUsedSubs?.map((lu) => (
          <div key={lu._id}>
            {lu.name} ({lu.score.toFixed(2)})
          </div>
        ))}
    </div>
  );

  return (
    <div className="flex h-1/2 h-full flex-row gap-4">
      <StatsCard title="Expensive & Barely Used" width="w-1/2" height="h-1/3">
        {BarelyUsed}
      </StatsCard>
      <StatsCard
        title="Top 3 Least Used Subscriptions"
        width="w-1/2"
        height="h-1/3"
      >
        {LeastUsed}
      </StatsCard>
    </div>
  );
}
