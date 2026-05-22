import  api from "@/lib/axios";

import {
  Booking,
  CreateBookingDto,
} from "@/types/booking.types";

export const getBookings =
  async (): Promise<Booking[]> => {
    const res = await api.get(
      "/bookings"
    );

    return res.data;
  };

export const createBooking =
  async (
    data: CreateBookingDto
  ) => {
    const res = await api.post(
      "/bookings",
      data
    );

    return res.data;
  };