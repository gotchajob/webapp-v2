import { apiServerFetch, errorSystem } from "../api-fetch";

export interface CheckCodeForgetPasswordRequest {
  email: string;
  code: string;
}
export interface CheckCodeForgetPasswordReponse {
  status: string;
  responseText: string;
  data: string;
}
export const UserCheckCodeForgetPassword = async (
  params: CheckCodeForgetPasswordRequest
): Promise<CheckCodeForgetPasswordReponse> => {
  try {
    const userForgotPassword = await apiServerFetch(
      "/user/check-code-forget-password",
      "POST",
      params
    );
    return userForgotPassword;
  } catch (error: any) {
    return errorSystem("Không thể lấy thông tin tài khoản", "");
  }
};
