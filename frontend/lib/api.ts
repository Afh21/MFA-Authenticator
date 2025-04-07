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

type ForgotPasswordType = {
  email: string;
};

export type MfaType = {
  message: string;
  secret: string;
  qrImageUrl: string;
};

type VerifyMFAType = {
  code: string;
  secretKey: string;
};

export const loginMutation = async (data: LoginType) =>
  await API.post("/auth/login", data);

export const registerMutation = async (data: RegisterType) =>
  await API.post("/auth/register", data);

export const forgotPasswordMutation = async (data: ForgotPasswordType) =>
  await API.post("/auth/password/forgot", data);

export const resetPasswordMutation = async (data: {
  password: string;
  verificationCode: string;
}) => {
  await API.post("/auth/password/reset", data);
};

export const verifyEmailMutation = async (data: { code: string }) =>
  await API.post("/auth/verify/email", data);

export const getUserSession = async () => await API.get("/session");

export const mfaSetupQueryFn = async () =>
  (await API.get<MfaType>("/mfa/setup")).data;

export const verifyMFAMutationFn = async (data: VerifyMFAType) =>
  await API.post("/mfa/verify", data);

export const revokeMFAMutationFn = async () => await API.put("/mfa/revoke");
