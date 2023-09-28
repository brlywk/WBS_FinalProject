import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import React from 'react';

const RADIAN = Math.PI / 180;
const data = [
  { name: 'A', value: 80, color: 'rgba(255, 0, 0, 0.5)' },
  { name: 'B', value: 45, color: 'rgba(0, 255, 0, 0.5)' },
  { name: 'C', value: 25, color: 'rgba(0, 0, 255, 0.5)' },
];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;
const value = 50;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path key="path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white shadow rounded">
        <h3 className="text-gray-600">{`Category: ${payload[0].name}`}</h3>
        <h4 className="text-gray-600">{`Total Price: $${payload[0].value}`}</h4>
        <p className="text-gray-500">{payload[0].payload.subscriptions}</p>
      </div>
    );
  }
  return null;
};

export default class Piechartwithneedle extends React.Component {
  render() {
    return (
      <div style={{ padding: 0, margin: 0, width: '100%', height: '100%', position: 'relative', top: '-50px', right: '30px' }}>
        <PieChart width={300} height={200}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="linear-gradient(45deg, rgba(136, 132, 216, 0.5) 30%, rgba(136, 132, 216, 0.2) 90%)"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? '#2C00A9' : index === 1 ? '#5DADE2' : 'white'} />
            ))}
            <Tooltip content={<CustomTooltip />} />
          </Pie>
          {needle(value, data, cx, cy, iR, oR, 'silver')}
        </PieChart>
      </div>
    );
  }
}

