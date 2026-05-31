import {
  Operator,
  CreateOperatorDTO,
} from "@/types/operator.types";

const API_URL = "http://localhost:5000/operators";

// GET
export const getOperators = async (): Promise<Operator[]> => {
  const res = await fetch(API_URL);

  if (!res.ok)
    throw new Error("Failed to fetch operators");

  return res.json();
};

// CREATE
export const createOperator = async (
  data: CreateOperatorDTO
): Promise<Operator> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      available: true,
    }),
  });

  if (!res.ok)
    throw new Error("Failed to create operator");

  return res.json();
};

// UPDATE
export const updateOperator = async (
  id: number,
  data: CreateOperatorDTO
): Promise<Operator> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT", // json-server uchun PUT
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      ...data,
      available: true,
    }),
  });

  if (!res.ok)
    throw new Error("Failed to update operator");

  return res.json();
};

// DELETE
export const deleteOperator = async (
  id: number
): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok)
    throw new Error("Failed to delete operator");
};