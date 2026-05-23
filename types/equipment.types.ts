export type Equipment = {
  id: number;

  name: string;
  category: string;
  image: string;

  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;

  operatorAvailable: boolean;

  // ✅ NEW
  operatorId?: number;

  location: string;
  rating: number;

  description: string;
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

  description: string;
};