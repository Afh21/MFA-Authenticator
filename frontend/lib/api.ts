import API from "./axios-client";

type LoginType = {
  email: string;
  password: string;
};

type RegisterType = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

export const loginMutation = async (data: LoginType) =>
  await API.post("/auth/login", data);

export const registerMutation = async (data: RegisterType) =>
  await API.post("/auth/register", data);
