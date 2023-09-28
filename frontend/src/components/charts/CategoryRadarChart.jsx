import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { useDataContext } from "../../contexts/dataContext";
import { filterByCategory } from "../../utils/filterHelper";

export default function CategoryRadarChart({ categoryId }) {
  const { subscriptions, usedCategories } = useDataContext();

  const filteredSubscriptions = filterByCategory(subscriptions, categoryId);

  // TODO: Should this use the maximum score or the average score for the axis

  const data = filteredSubscriptions.map((subscription) => {
    return {
      name: subscription.name,
      price: subscription.price,
      score: subscription.score,
    };
  });

  // TODO: Hide charts if too few subscriptions are in category / have been rated
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar
            name="Price"
            dataKey="price"
            stroke="#2C00A9"
            fill="#2C00A9"
            fillOpacity={0.6}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#5DADE2"
            fill="#5DADE2"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
}
