import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { useDataContext } from "../../contexts/dataContext";

export default function UsageRadarChart() {
  const { usedCategories } = useDataContext();

  const data = usedCategories?.map((category) => {
    return {
      name: category.name,
      totalCost: category.totalCost,
      categoryScore: category.categoryScore,
    };
  });

  // TODO: Hide charts if too few subscriptions are in category / have been rated
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: "#6b7280", fontSize: "12px" }}
          />
          <Radar
            name="Total Cost"
            dataKey="totalCost"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.5}
          />
          <Radar
            name="Score"
            dataKey="categoryScore"
            stroke="#0ea5e9"
            fill="#0ea5e9"
            fillOpacity={0.75}
            domain={[1, 5]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
}
