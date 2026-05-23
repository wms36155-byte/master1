export type UserRole =
  | "admin"
  | "user";

export type User = {
  id: number;

  fullName: string;

  email: string;

  role: UserRole;

  avatar?: string;
};