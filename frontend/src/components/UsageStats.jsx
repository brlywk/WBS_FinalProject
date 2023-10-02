import { useEffect, useState } from "react";
import { useDataContext } from "../contexts/dataContext";
import StatsCard from "./StatsCard";

export default function UsageStats() {
  const { subscriptions, dashboardData, usedCategories } = useDataContext();
  // const [usageData, setUsageData] = useState({});
  //
  // useEffect(() => {
  //   if (subscriptions && dashboardData && usedCategories) {
  //     const potentialSavings = subscriptions
  //       .filter((sub) => sub.isPotentialSaving)
  //       .map((sub) => ({
  //         title: `${sub.name} (Barely Used, Most Expensive)`,
  //         value: `EUR ${sub.monthlyPrice.toFixed(2)}`,
  //       }));
  //
  //     const categorySpending = usedCategories.map((cat) => ({
  //       title: `Spent on ${cat.name}`,
  //       value: `EUR ${cat.totalCost.toFixed(2)}`,
  //     }));
  //
  //     setUsageData({
  //       potentialSavings,
  //       categorySpending,
  //       mostUsed: {
  //         title: "Most Used",
  //         value: dashboardData.mostUsed.name,
  //       },
  //       leastUsed: {
  //         title: "Least Used",
  //         value: dashboardData.leastUsed.name,
  //       },
  //       totalSpending: {
  //         title: "Total Spending",
  //         value: `EUR ${dashboardData.totalCostPerMonth.toFixed(2)}`,
  //       },
  //     });
  //   }
  // }, [subscriptions, dashboardData, usedCategories]);

  return (
    <div className={`h-[10vh] grid grid-cols-4 gap-2`}>
      {/* {usageData.potentialSavings && */}
      {/*   usageData.potentialSavings.map((data, index) => ( */}
      {/*     <StatsCard key={index} title={data.title} value={data.value} /> */}
      {/*   ))} */}
      {/* {usageData.categorySpending && */}
      {/*   usageData.categorySpending.map((data, index) => ( */}
      {/*     <StatsCard key={index} title={data.title} value={data.value} /> */}
      {/*   ))} */}
      {/* {usageData.mostUsed && ( */}
      {/*   <StatsCard */}
      {/*     title={usageData.mostUsed.title} */}
      {/*     value={usageData.mostUsed.value} */}
      {/*   /> */}
      {/* )} */}
      {/* {usageData.leastUsed && ( */}
      {/*   <StatsCard */}
      {/*     title={usageData.leastUsed.title} */}
      {/*     value={usageData.leastUsed.value} */}
      {/*   /> */}
      {/* )} */}
      {/* {usageData.totalSpending && ( */}
      {/*   <StatsCard */}
      {/*     title={usageData.totalSpending.title} */}
      {/*     value={usageData.totalSpending.value} */}
      {/*   /> */}
      {/* )} */}
    </div>
  );
}
