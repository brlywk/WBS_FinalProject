import CategroyStats from "../components/CategroyStats";
import SubscriptionList from "../components/SubscriptionList";
import CategoryRadarChart from "../components/charts/CategoryRadarChart";
import { useDataContext } from "../contexts/dataContext";

export default function CategoryPage({ categoryId }) {
  const { usedCategories } = useDataContext();

  return (
    <div>
      <CategroyStats
        category={usedCategories?.find((c) => c._id === categoryId)}
      />
      <div className="grid grid-cols-2 gap-2 pt-2">
        <SubscriptionList categoryId={categoryId} itemsPerPage={10} />
        <div className="h-full w-full p-10">
          <CategoryRadarChart categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
}
