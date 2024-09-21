import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetUserCurrentResponse {
  status: string;
  responseText: string;
  data: userCurrent;
}

export interface userCurrent {
  id: number;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  roleId: number;
  fullName: string,
}

export async function GetUserCurrent(accessToken: string): Promise<GetUserCurrentResponse> {
  try {
    const res = await apiServerFetch(`/user/current`, 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error(res.responseText || 'Error fetching user data');
    }
    return res;
  } catch (error: any) {
    return errorSystem(error, {
      status: 'error',
      responseText: error.message,
      data: {
        id: 0,
        avatar: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        roleId: 0,
      },
    });
  }
}
