export type Booking = {
  id: number;
  equipmentName: string;
  customerName: string;
  phone: string;
  days: number;
  totalPrice: number;
  withOperator: boolean;
  createdAt: string;
};

export type CreateBookingDto = {
  equipmentName: string;
  customerName: string;
  phone: string;
  days: number;
  totalPrice: number;
  withOperator: boolean;
  createdAt: string;
};