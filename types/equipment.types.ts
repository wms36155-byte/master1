export type Equipment = {
  id: number;

  name: string;
  category: string;
  image: string;

  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;

  operatorAvailable: boolean;

  operatorId?: number;

  location: string;

  rating: number; // ✅ kerakli field (DOIM NUMBER BO'LISHI KERAK)

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

  rating: number; // ✅ BU SHART (sen ishlatyapsan formda)

  description: string;
};