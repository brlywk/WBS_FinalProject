import { useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, activeIndex, activePie }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    if (activePie === "outer") {
      return (
        <div className="rounded bg-white p-3 shadow">
          <div className="grid grid-cols-[max-content_1fr] gap-2">
            <div>Category:</div>
            <div>{data.name}</div>
            <div>Total Cost:</div>
            <div>EUR {data.value.toFixed(2)}</div>
          </div>
        </div>
      );
    } else {
      // Assumes subscriptions is an array of objects with name property
      return (
        <div className="rounded bg-white p-3 shadow">
          {data.subscriptions.map((sub) => (
            <div key={sub._id} className="flex flex-col">
              <div className="text-sm">Subscription: {sub.name}</div>
              <div className="flex flex-row gap-4 text-xs text-gray-500">
                <div>Price: EUR {sub.price.toFixed(2)}</div>
                <div>Score: {sub.score.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
  return null;
};

export default function UsedCategoriesPieChart({ pieData }) {
  const [activePie, setActivePie] = useState();
  const [activeIndex, setActiveIndex] = useState();

  const handleMouseEnter = (data, index, pie) => {
    setActiveIndex(index);
    setActivePie(pie);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    setActivePie(null);
  };

  return (
    <ResponsiveContainer>
      <PieChart>
        {/* Inner Ring: Subscriptions */}
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#1D4ED8"
          onMouseEnter={(data, index) => handleMouseEnter(data, index, "inner")}
          onMouseLeave={handleMouseLeave}
        >
          {[].map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {/* Outer Ring: Categories */}
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#AAB8C2"
          labelLine={{ stroke: "black" }}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            name,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="black"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                className="text-xs font-bold text-gray-800"
              >
                {name} ({(percent * 100).toFixed(0)}%)
                {/* {`${(percent * 100).toFixed(0)}%`} */}
              </text>
            );
          }}
          onMouseEnter={(data, index) => handleMouseEnter(data, index, "outer")}
          onMouseLeave={handleMouseLeave}
        />
        <Tooltip
          content={
            <CustomTooltip activeIndex={activeIndex} activePie={activePie} />
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
