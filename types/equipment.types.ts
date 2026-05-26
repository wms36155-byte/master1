export type Equipment = {
  id: string;
  name: string;
  category: string;
  image?: string;

  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;

  operatorAvailable: boolean;

  location: string;
  rating: number;
  description: string;

  // ✅ FIX
  operatorId?: number;
};
export type CreateEquipmentDto = {
  name: string;
  category: string;
  image: string;

  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;

  operatorAvailable: boolean;

  location: string;

  rating: number; // ✅ BU SHART (sen ishlatyapsan formda)

  description: string;
};