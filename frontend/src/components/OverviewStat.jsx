"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 500) + 100,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 500) + 100,
  },
]

export default function OverviewStat() {
  return (
    <div className="">
      <h4 className="px-3 text-sm font-semibold">Monthly Overview</h4>
      <div className="p-2 rounded-lg border-2 m-2">
        <BarChart width={450} height={200} data={data}>
          <XAxis
            dataKey="name"
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#000000"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `€${Math.floor(value / 5)}`}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </div>
    </div>
  )
}