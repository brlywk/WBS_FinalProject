import { useDataContext } from "../contexts/dataContext";
import Piechartwithneedle from "./charts/Piechartwithneedle";
import UsedCategoriesPieChart from "./charts/UsedCategoriesPieChart";

export default function OverviewStat() {
  const { subscriptions, usedCategories, dashboardData } = useDataContext();

  const pieData =
    usedCategories?.length > 0 && subscriptions?.length > 0
      ? usedCategories.map((category) => {
          return {
            name: category.name,
            value: category.totalCost,
            subscriptions: subscriptions.filter(
              (s) => s.category._id === category._id,
            ),
          };
        })
      : [];

  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg bg-opacity-0 p-4 backdrop-blur">
      <div className="flex flex-col items-center justify-start">
        <h4 className="text-sm font-bold text-gray-800">
          Highest Spend Categories
        </h4>
        <div className="h-full min-h-[250px] w-full p-2">
          <UsedCategoriesPieChart pieData={pieData} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-start">
        <h4 className="text-center text-sm font-bold text-gray-800">
          Subzero Spend-o-meter
          <div className="text-xs font-normal">
            Track Subscription Spend Above Average
          </div>
        </h4>
        <div className="h-full min-h-[250px] w-full p-2">
          <Piechartwithneedle
            maxFirstSegment={219}
            needleValue={dashboardData?.totalCostPerMonth}
          />
        </div>
      </div>
    </div>
  );
}
