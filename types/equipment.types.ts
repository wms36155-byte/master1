// types/equipment.types.ts

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

  operatorId?: number | null;
};

export type CreateEquipmentDto = Omit<
  Equipment,
  "id" | "operatorId"
>;