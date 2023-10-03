import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useRef, useEffect, useState } from "react";

const RADIAN = Math.PI / 180;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + oR) / 4.5;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      key="path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ];
};

const CustomTooltip = ({ active, payload, baseValue, userSpend }) => {
  function getLabel() {
    const name = payload[0].name;
    if (name === "Average") {
      return baseValue;
    } else if (name === "Above Average") {
      return baseValue + payload[0].value;
    } else {
      return baseValue + 2 * payload[0].value;
    }
  }

  if (active && payload && payload.length) {
    return (
      <div className="rounded border-black/25 bg-white/75 p-3 shadow-xl backdrop-blur">
        <div className="grid grid-cols-[max-content_1fr] gap-2">
          <div className="text-gray-500">Your Current Spending:</div>
          <div>EUR {userSpend.toFixed(2)}</div>
          <div className="text-gray-500">Global {payload[0].name} Cost:</div>
          <div>EUR {getLabel()}</div>
        </div>
      </div>
    );
  }
  return null;
};

export default function PieChartWithNeedle({ maxFirstSegment, needleValue }) {
  const containerRef = useRef(null);

  const [computedCX, setComputedCX] = useState(0);
  const [computedCY, setComputedCY] = useState(0);
  const [computedIR, setComputedIR] = useState(0);
  const [computedOR, setComputedOR] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const width = entry.target.clientWidth;
        const height = entry.target.clientHeight;
        if (width && height) {
          setComputedCX(width * 0.5);
          setComputedCY(height * 0.75);
          setComputedIR(width * 0.5);
          setComputedOR(width);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // IMPORTANT: If the name's here are changed, they also need to be changed in
  // the CustomTooltip above!
  const data = [
    { name: "Average", value: maxFirstSegment },
    {
      name: "Above Average",
      value: Math.floor(maxFirstSegment / 2),
    },
    {
      name: "High",
      value: Math.floor(maxFirstSegment / 2),
    },
  ];

  const cx = "50%";
  const cy = "75%";
  const iR = "50%";
  const oR = "100%";

  return (
    <div ref={containerRef} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            nameKey="name"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="none" // You may need to adjust the fill to meet your design
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === 0 ? "#4f46e5" : index === 1 ? "#0ea5e9" : "white"
                }
              />
            ))}
          </Pie>
          <Tooltip
            content={
              <CustomTooltip
                baseValue={maxFirstSegment}
                userSpend={needleValue}
              />
            }
          />

          {needle(
            needleValue,
            data,
            computedCX,
            computedCY,
            computedIR,
            computedOR,
            "#6b7280",
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
