import { apiServerFetch, errorSystem } from "../api-fetch";

export interface UserRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface UserRegisterResponse {
  status: string;
  responseText: string;
  data: string;
}

export const UserRegister = async (
  params: UserRegisterRequest
): Promise<UserRegisterResponse> => {
  try {
    const userRegister = await apiServerFetch("/user/register", "POST", params);
    
    return userRegister;
  } catch (error: any) {
    return errorSystem("Đăng kí thất bại", "");
  }
};
