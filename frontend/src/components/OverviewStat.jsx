import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useDataContext } from '../contexts/dataContext';
import Piechartwithneedle from './Piechartwithneedle';
import useCategory from '../hooks/useCategory';

export default function OverviewStat() {
  const { usedCategories } = useDataContext();
  const { getAllCategories } = useCategory();

  const pieData = usedCategories && usedCategories.length > 0 ? usedCategories.map(category => ({
    name: category.name,
    value: category.totalCost,
    subscriptions: category.subscriptions ? category.subscriptions.map(sub => sub.name).join(', ') : '',
  })) : [];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white shadow rounded">
          <h3 className="text-gray-600">{`Category: ${payload[0].name}`}</h3>
          <h4 className="text-gray-600">{`Total Price: $${payload[0].value}`}</h4>
          <p className="text-gray-500">{`Subscriptions: ${payload[0].payload.subscriptions}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-2 gap-4 bg-opacity-0 backdrop-blur">
      <div style={{ paddingLeft: '30px' }}>
        <h4 className="text-sm font-bold text-gray-800 ml-3">Highest Spend Categories</h4>
        <PieChart width={250} height={250}>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#1D4ED8">
            { pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />) }
          </Pie>
          <Pie data={pieData} dataKey="value" nameKey="subscriptions" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#AAB8C2" labelLine={{ stroke: 'black' }} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold text-gray-800">
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            );
          }} />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>
      <div className="mt-0">
        <h4 className="text-sm font-bold text-gray-800 ml-3">Subzero Spend-o-meter</h4>
        <p className="text-xs font-semibold text-gray-600 ml-3">Track Subscription Spend Above Average</p>
        <Piechartwithneedle />
      </div>
    </div>
  );
}





