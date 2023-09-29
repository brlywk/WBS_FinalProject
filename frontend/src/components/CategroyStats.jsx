import { useDataContext } from "../contexts/dataContext";
import StatsCard from "./StatsCard";

export default function CategroyStats({ category }) {
  const { subscriptions } = useDataContext();

  const subscriptionsInCategory = subscriptions
    ?.filter((s) => s.category._id === category?._id && s.validScore)
    .sort((a, b) => (a.score >= b.score ? 1 : -1));

  const canShowMostAndLeastUsed =
    subscriptionsInCategory?.length === category?.subscriptionCount;

  console.log("Category", category);
  console.log("Subscriptions in category", subscriptionsInCategory);
  console.log("Can show most / least", canShowMostAndLeastUsed);

  const mostUsed = canShowMostAndLeastUsed
    ? subscriptionsInCategory[0]
    : "Insufficient Data";
  const leastUsed = canShowMostAndLeastUsed
    ? subscriptionsInCategory[subscriptionsInCategory.length - 1]
    : "Insufficient Data";

  return (
    <div className="grid h-[10vh] grid-cols-4 gap-2">
      <StatsCard title="Total Cost" width="w-full">
        {category?.totalCost.toFixed(2)}
      </StatsCard>
      <StatsCard title="Potential Savings" width="w-full">
        {category?.potentialSavings.toFixed(2)}
      </StatsCard>
      <StatsCard title="Most Used" width="w-full">
        {mostUsed}
      </StatsCard>
      <StatsCard title="Least Used" width="w-full">
        {leastUsed}
      </StatsCard>
    </div>
  );
}
