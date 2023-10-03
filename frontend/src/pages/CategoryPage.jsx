import CategroyStats from "../components/CategroyStats";
import SubscriptionList from "../components/SubscriptionList";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import CategoryRadarChart from "../components/charts/CategoryRadarChart";
import { useDataContext } from "../contexts/dataContext";

export default function CategoryPage({ categoryId }) {
  const { usedCategories } = useDataContext();

  const category = usedCategories?.find((c) => c._id === categoryId);

  return (
    <div>
      <CategroyStats category={category} />
      <div className="grid grid-cols-2 gap-2 pt-2">
        <SubscriptionList categoryId={categoryId} itemsPerPage={10} />
        <div className="h-full min-h-[25vh] w-full p-10">
          {category?.subscriptionCount > 3 && (
            <div className="h-1/2">
              <CategoryRadarChart categoryId={categoryId} />
            </div>
          )}

          {category?.subscriptionCount > 1 && (
            <div className="flex h-1/2 min-h-[25vh] w-full items-center justify-center">
              <CategoryPieChart categoryId={categoryId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
