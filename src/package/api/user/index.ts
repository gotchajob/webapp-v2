import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetUserRequest {
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  search?: string[];
}

export interface User {
  id: number;
  avatar: string;
  email: string;
  fullName: string;
  phone: number;
  address: string;
  roleId: number;
  status: number;
  createdAt: string;
}

export interface GetUserResponse {
  status: string;
  responseText: string;
  data: {
    list: User[];
    totalPage: number;
  };
}

export async function GetUser(params: GetUserRequest, accessToken: string): Promise<GetUserResponse> {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', params.pageNumber + '');
    searchParams.append('pageSize', params.pageSize + '');
    if (params.sortBy) {
      searchParams.append('sortBy', params.sortBy + '');
    }
    if (params.search) {
      params.search.forEach((value) => {
        searchParams.append('search', value + '');
      });
    }
    const res = await apiServerFetch('/user?' + searchParams.toString(), 'GET', undefined, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', { list: [], totalPage: 0 });
  }
}
