// services/booking.service.ts
import api from "@/lib/axios";
import { Booking, CreateBookingDto } from "@/types/booking.types";

export const getBookings = async (): Promise<Booking[]> => {
  const { data } = await api.get("/bookings");
  return data;
};

export const createBooking = async (
  payload: CreateBookingDto
): Promise<Booking> => {
  const { data } = await api.post("/bookings", payload);
  return data;
};

export const deleteBooking = async (id: string) => {
  await api.delete(`/bookings/${id}`);
};