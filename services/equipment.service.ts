import { api } from "@/lib/axios";
import  { Equipment } from "@/types/equipment.types";
import { CreateEquipmentDto } from "@/types/equipment.types";
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

export const deleteEquipment = async (
  id: number
) => {
  const res = await api.delete(
    `/equipments/${id}`
  );

  return res.data;
};


export const createEquipment = async (
  data: CreateEquipmentDto
) => {
  const res = await api.post(
    "/equipments",
    data
  );

  return res.data;
};

export const updateEquipment = async (
  id: number,
  data: Partial<CreateEquipmentDto>
) => {
  const res = await api.patch(
    `/equipments/${id}`,
    data
  );

  return res.data;
};