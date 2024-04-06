import { apiServerFetch, errorSystem } from "../api-fetch";

export interface CreateVerifyRequest {
  email: string;
}

export interface CreateVerifyResponse {
  status: string;
  responseText: string;
  data: string;
}

export const UserCreateVerify = async (
  params: CreateVerifyRequest
): Promise<CreateVerifyResponse> => {
  try {
    const userRegister = await apiServerFetch("/user/create-verify-email", "POST", params);
    return userRegister;
  } catch (error: any) {
    return errorSystem("Xác thực thất bại", "");
  }
};
