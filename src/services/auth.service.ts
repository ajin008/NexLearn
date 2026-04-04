import {
  SendOtpResponse,
  VerifyOtpResponse,
  CreateProfileResponse,
} from "./../types/auth.types";

import api from "../lib/axios";
import { AUTH_ENDPOINTS } from "../constants/endpoints";

export const sendOtp = async (mobile: string): Promise<SendOtpResponse> => {
  console.log("API call: sendOtp with mobile =", mobile);
  const formData = new FormData();
  formData.append("mobile", mobile);

  const res = await api.post<SendOtpResponse>(
    AUTH_ENDPOINTS.SEND_OTP,
    formData
  );
  return res.data;
};

export const verifyOtp = async (
  mobile: string,
  otp: string
): Promise<VerifyOtpResponse> => {
  const formData = new FormData();
  formData.append("mobile", mobile);
  formData.append("otp", otp);

  const res = await api.post<VerifyOtpResponse>(
    AUTH_ENDPOINTS.VERIFY_OTP,
    formData
  );
  return res.data;
};

interface CreateProfilePayload {
  mobile: string;
  name: string;
  email: string;
  qualification: string;
  image: File;
}

export const createProfile = async (
  payload: CreateProfilePayload
): Promise<CreateProfileResponse> => {
  const formData = new FormData();
  formData.append("mobile", payload.mobile);
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("qualification", payload.qualification);
  formData.append("profile_image", payload.image);

  const res = await api.post<CreateProfileResponse>(
    AUTH_ENDPOINTS.CREATE_PROFILE,
    formData
  );
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post(AUTH_ENDPOINTS.LOGOUT);
};
