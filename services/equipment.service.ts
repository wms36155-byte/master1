import api from "@/lib/axios";

import type {
  Equipment,
  CreateEquipmentDto,
} from "@/types/equipment.types";

// =========================
// GET ALL EQUIPMENTS
// =========================
export const getEquipments =
  async (): Promise<
    Equipment[]
  > => {
    try {
      const { data } =
        await api.get("/equipments");

      return data;
    } catch (error) {
      console.error(
        "Get equipments error:",
        error
      );

      throw error;
    }
  };

// =========================
// GET EQUIPMENT BY ID
// =========================
export const getEquipmentById =
  async (
    id: string
  ): Promise<Equipment> => {
    try {
      const { data } =
        await api.get<Equipment>(
          `/equipments/${id}`
        );

      return data;
    } catch (error) {
      console.error(
        "Get equipment by id error:",
        error
      );

      throw error;
    }
  };

// =========================
// CREATE EQUIPMENT
// =========================
export const createEquipment =
  async (
    payload: CreateEquipmentDto
  ): Promise<Equipment> => {
    try {
      const { data } =
        await api.post<
          Equipment
        >(
          "/equipments",
          payload
        );

      return data;
    } catch (error) {
      console.error(
        "Create equipment error:",
        error
      );

      throw error;
    }
  };

// =========================
// UPDATE EQUIPMENT
// =========================
export const updateEquipment =
  async (
    id: string,
    payload: Partial<CreateEquipmentDto>
  ): Promise<Equipment> => {
    try {
      const { data } =
        await api.patch<
          Equipment
        >(
          `/equipments/${id}`,
          payload
        );

      return data;
    } catch (error) {
      console.error(
        "Update equipment error:",
        error
      );

      throw error;
    }
  };

// =========================
// DELETE EQUIPMENT
// =========================
export const deleteEquipment =
  async (
    id: string
  ): Promise<void> => {
    try {
      await api.delete(
        `/equipments/${id}`
      );
    } catch (error) {
      console.error(
        "Delete equipment error:",
        error
      );

      throw error;
    }
  };