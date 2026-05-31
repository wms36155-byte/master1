// types/booking.types.ts

export type Booking = {
  id: string;

  equipmentName: string;

  customerName: string;
  phone: string;

  days: number;
  totalPrice: number;

  withOperator: boolean;

  createdAt: string;
};

export type CreateBookingDto = Omit<Booking, "id">;