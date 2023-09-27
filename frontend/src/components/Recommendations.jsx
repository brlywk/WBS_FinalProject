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
    <div className="flex h-full flex-row gap-4">
      <StatsCard
        title="Expensive & Barely Used"
        value={BarelyUsed}
        width="w-1/2"
        height="h-1/3"
      />
      <StatsCard
        title="Top 3 Least Used Subscriptions"
        value={LeastUsed}
        width="w-1/2"
        height="h-1/3"
      />
    </div>
  );
}
