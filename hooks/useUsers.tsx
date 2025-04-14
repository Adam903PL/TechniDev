import { create } from "zustand";

export const data = [
  {
    id: "28c7e3d8-2e72-43a7-a5bf-eb5107cd556d",
    email: "alice.johnson@example.com",
    password: "password123",
  },
  {
    id: "f4b34a3a-cee8-42ef-ba06-caeb5bc147da",
    email: "bob.smith@example.com",
    password: "password123",
  },
  {
    id: "07b50773-f86e-400a-9397-ec6fabecf867",
    email: "charlie.brown@example.com",
    password: "password123",
  },
  {
    id: "be388ee9-b0e4-40c7-bc46-38150d44283b",
    email: "david.lee@example.com",
    password: "password123",
  },
  {
    id: "108d2885-c919-4891-8785-cc33a6823ece",
    email: "eva.green@example.com",
    password: "password123",
    
  },
];

interface DataType {
  id: string;
  email: string;
  password: string;
}

interface DataTypeState {
  login: (credentials: Omit<DataType, "id">) => boolean;
}

export const useUsers = create<DataTypeState>(() => ({
  login: ({ email, password }) => {
    const user = data.find(
      (user) => user.email === email && user.password === password
    );
    return !!user;
  },
}));
