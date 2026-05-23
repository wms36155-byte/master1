import api from "@/lib/axios";

export const getBookings =
  async () => {
    const res =
      await api.get(
        "/bookings"
      );

    return res.data;
  };

export const createBooking =
  async (data: any) => {
    const res =
      await api.post(
        "/bookings",
        data
      );

    return res.data;
  };

export const deleteBooking =
  async (id: string) => {
    const res =
      await api.delete(
        `/bookings/${id}`
      );

    return res.data;
  };