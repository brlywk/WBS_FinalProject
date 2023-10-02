import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { useDataContext } from "../../contexts/dataContext";
import { filterByCategory } from "../../utils/filterHelper";

export default function CategoryPieChart({ categoryId }) {
  const { subscriptions } = useDataContext();
  const filteredSubscriptions = filterByCategory(subscriptions, categoryId);

  const data = filteredSubscriptions.map((subscription) => {
    return {
      name: subscription.name,
      value: subscription.monthlyPrice,
    };
  });

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, outerRadius, payload } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percent = ((payload.value / total) * 100).toFixed(0);

    return (
      <text
        x={x}
        y={y}
        fill="#6b7280"
        fontSize={12}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="middle"
      >
        <tspan x={x} dy="0">
          {payload.name}
        </tspan>
        <tspan x={x} dy="15">
          EUR {payload.value.toFixed(2)} ({percent}%)
        </tspan>
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius="60%"
          fill="#0ea5e9" // Single color for all slices
          dataKey="value"
          labelLine={false}
          label={renderCustomizedLabel}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
