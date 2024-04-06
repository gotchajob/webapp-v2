import { apiServerFetch, errorSystem } from "../api-fetch";

export interface UserCreateForgotPasswordRequest {
  email: string;
}
export interface UserCreateForgotPasswordResponse {
  status: string;
  responseText: string;
  data: string;
}
export const UserCreateForgotPassword = async (
  params: UserCreateForgotPasswordRequest
): Promise<UserCreateForgotPasswordResponse> => {
  try {
    const userForgotPassword = await apiServerFetch(
      "/user/create-forget-password",
      "POST",
      params
    );
    return userForgotPassword;
  } catch (error: any) {
    return errorSystem("Không thể lấy thông tin tài khoản", "");
  }
};
