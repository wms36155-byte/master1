"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import { getBookings } from "@/services/booking.service";

import { Booking } from "@/types/booking.types";

export default function RevenueChart() {
  const [data, setData] = useState<
    {
      month: string;
      revenue: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings: Booking[] =
        await getBookings();

      const monthlyData = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].map((month, index) => {
        const revenue =
          bookings
            .filter((booking) => {
              const date =
                new Date(
                  booking.createdAt
                );

              return (
                date.getMonth() ===
                index
              );
            })
            .reduce(
              (acc, item) =>
                acc + item.totalPrice,
              0
            );

        return {
          month,
          revenue,
        };
      });

      setData(monthlyData);
    };

    fetchBookings();
  }, []);

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