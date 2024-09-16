import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface UserCurrentRequest { }

export interface UserCurrentResponse {
  status: string;
  responseText: string;
  data: UserProfile;
}

export interface UserProfile {
  id: number;
  fullName: string;
  avatar: string;
}

export const GetUserCurrent = async (accessToken: string): Promise<UserCurrentResponse> => {
  try {
    const res = await apiServerFetch('/user/current', 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Đăng nhập thất bại', { token: '' });
  }
};
