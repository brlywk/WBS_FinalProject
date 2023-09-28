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
    <div className="grid grid-cols-4 gap-4 pb-4">
      <StatsCard
        title="Total Cost"
        value={category?.totalCost.toFixed(2)}
        width="w-full"
      />
      <StatsCard
        title="Potential Savings"
        value={category?.potentialSavings.toFixed(2)}
        width="w-full"
      />
      <StatsCard title="Most Used" value={mostUsed} width="w-full" />
      <StatsCard title="Least Used" value={leastUsed} width="w-full" />
    </div>
  );
}
