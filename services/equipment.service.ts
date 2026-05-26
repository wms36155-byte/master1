import api from "@/lib/axios";

import type {
  Equipment,
  CreateEquipmentDto,
} from "@/types/equipment.types";

// =========================
// GET ALL EQUIPMENTS
// =========================
export const getEquipments = async (): Promise<
  Equipment[]
> => {
  try {
    const response =
      await api.get<Equipment[]>(
        "/equipments"
      );

    return response.data;
  } catch (error) {
    console.error(
      "Get equipments error:",
      error
    );

    return [];
  }
};

// =========================
// GET EQUIPMENT BY ID
// =========================
export const getEquipmentById =
  async (
    id: string
  ): Promise<Equipment | null> => {
    try {
      if (!id) {
        return null;
      }

      const response =
        await api.get<Equipment>(
          `/equipments/${id}`
        );

      return response.data;
    } catch (error) {
      console.error(
        "Get equipment error:",
        error
      );

      return null;
    }
  };

// =========================
// CREATE EQUIPMENT
// =========================
export const createEquipment =
  async (
    payload: CreateEquipmentDto
  ): Promise<Equipment | null> => {
    try {
      const response =
        await api.post<Equipment>(
          "/equipments",
          payload
        );

      return response.data;
    } catch (error) {
      console.error(
        "Create equipment error:",
        error
      );

      return null;
    }
  };

// =========================
// UPDATE EQUIPMENT
// =========================
export const updateEquipment =
  async (
    id: string,
    payload: Partial<CreateEquipmentDto>
  ): Promise<Equipment | null> => {
    try {
      const response =
        await api.patch<Equipment>(
          `/equipments/${id}`,
          payload
        );

      return response.data;
    } catch (error) {
      console.error(
        "Update equipment error:",
        error
      );

      return null;
    }
  };

// =========================
// DELETE EQUIPMENT
// =========================
export const deleteEquipment =
  async (
    id: string
  ): Promise<boolean> => {
    try {
      await api.delete(
        `/equipments/${id}`
      );

      return true;
    } catch (error) {
      console.error(
        "Delete equipment error:",
        error
      );

      return false;
    }
  };