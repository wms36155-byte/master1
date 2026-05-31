import api from "@/lib/axios";
import { Equipment } from "@/types/equipment.types";

// GET ALL
export const getEquipments = async (): Promise<Equipment[]> => {
  const { data } = await api.get("/equipments");
  return data;
};

// ✅ GET BY ID (SENDA YO‘Q EDI)
export const getEquipmentById = async (
  id: string
): Promise<Equipment> => {
  const { data } = await api.get(`/equipments/${id}`);
  return data;
};

// CREATE
export const createEquipment = async (payload: any) => {
  const { data } = await api.post("/equipments", payload);
  return data;
};

// UPDATE
export const updateEquipment = async (id: string, payload: any) => {
  const { data } = await api.patch(`/equipments/${id}`, payload);
  return data;
};

// DELETE
export const deleteEquipment = async (id: string) => {
  const { data } = await api.delete(`/equipments/${id}`);
  return data;
};