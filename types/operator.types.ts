export type Operator = {
  id: number;
  name: string;
  phone: string;
  experience: number;
  location: string;
  available: boolean;
};

export type CreateOperatorDTO = {
  name: string;
  phone: string;
  experience: number;
  location: string;
  available?: boolean;
};

export type OperatorFormState = {
  name: string;
  phone: string;
  experience: string;
  location: string;
};