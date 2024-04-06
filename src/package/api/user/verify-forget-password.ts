import { apiServerFetch, errorSystem } from "../api-fetch";

export interface VerifyForgetPasswordRequest {
  email: string;
  code: string;
  password: string;
}
export interface VerifyForgetPasswordResponse {
  status: string;
  responseText: string;
  data: string;
}

export const VerifyForgetPassword = async (
    params: VerifyForgetPasswordRequest
  ): Promise<VerifyForgetPasswordResponse> => {
    try {
      const userRegister = await apiServerFetch("/user/verify-forget-password", "POST", params);
      return userRegister;
    } catch (error: any) {
      return errorSystem("Xác thực thất bại", "");
    }
  };
  