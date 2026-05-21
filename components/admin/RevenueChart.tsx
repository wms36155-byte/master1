"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    month: "Jan",
    revenue: 4000,
  },
  {
    month: "Feb",
    revenue: 7000,
  },
  {
    month: "Mar",
    revenue: 12000,
  },
  {
    month: "Apr",
    revenue: 9000,
  },
  {
    month: "May",
    revenue: 18000,
  },
];

export default function RevenueChart() {
  return (
    <div className="bg-[#102E1C] border border-white/10 rounded-3xl p-6 mt-10">
      <h2 className="text-3xl font-black mb-10">
        Revenue Analytics
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={data}>
            <XAxis dataKey="month" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#22c55e"
              fill="#22c55e"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}