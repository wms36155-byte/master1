import { api } from "@/lib/axios";

import { Booking } from "@/types/booking.types";

export const createBooking = async (
  booking: Booking
) => {
  const res = await api.post(
    "/bookings",
    booking
  );

  return res.data;
};

export const getBookings = async () => {
  const res = await api.get("/bookings");

  return res.data;
};