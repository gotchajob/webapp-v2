import { apiServerFetch, errorSystem } from '../api-fetch';

export interface UserVerifyRequest {
  email: string;
  code: string;
}
export interface UserVerifyResponse {
  status: string;
  responseText: string;
  data: {
    fullName: string;
  };
}

export const UserVerify = async (params: UserVerifyRequest): Promise<UserVerifyResponse> => {
  try {
    const userRegister = await apiServerFetch(`/user/${params.email}/verify/${params.code}`, 'GET');
    return userRegister;
  } catch (error: any) {
    return errorSystem('Xác thực thất bại', '');
  }
};
