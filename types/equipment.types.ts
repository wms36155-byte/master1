export type Equipment = {
  id: number;
  name: string;
  category: string;
  image: string;

  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;

  operatorAvailable: boolean;

  location: string;
  rating: number;

  description: string;
};