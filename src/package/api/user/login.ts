import { apiServerFetch, errorSystem } from "../api-fetch";

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  status: string;
  responseText: string;
  data: {
    token: string;
    roleId: number
  };
}

export const UserLogin = async (
  params: UserLoginRequest
): Promise<UserLoginResponse> => {
  try {
    const res = await apiServerFetch("/user/login", "POST", params);
    return res;
  } catch (error: any) {
    return errorSystem("Đăng nhập thất bại", { token: "" });
  }
};
