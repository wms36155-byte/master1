import { api } from "@/lib/axios";
import { Equipment } from "@/types/equipment.types";

export const getEquipments = async (): Promise<Equipment[]> => {
  const res = await api.get("/equipments");

  return res.data;
};

export const getEquipmentById = async (
  id: string
): Promise<Equipment> => {
  const res = await api.get(`/equipments/${id}`);

  return res.data;
};