export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  login: boolean;
  message: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
}

export interface CreateProfileResponse {
  success: boolean;
  message: string;
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
  qualification: string;
  profile_image: string;
}
