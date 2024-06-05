import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetExpertRegisterRequest {
  page: number;
  limit: number;
}

export interface GetExpertRegisterResponse {
  status: string;
  responseText: string;
  data: {
    list: ExpertRegister[];
    total: number;
  };
}

export interface ExpertRegister {
  id: number;
  email: string;
  createAt: string;
}

export interface PostExpertRegisterRequest {
  email: string;
}

export interface PostExpertRegisterResponse {
  status: string;
  responseText: string;
  data: string;
}

export const GetExpertRegister = async (params: GetExpertRegisterRequest, accessToken: string): Promise<GetExpertRegisterResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('page', params.page + '');
    searchParams.set('limit', params.limit + '');

    const res = await apiServerFetch('/expert-register-request?' + searchParams.toString(), 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', { list: [], total: 0 });
  }
};

export const PostExpertRegister = async (params: PostExpertRegisterRequest): Promise<PostExpertRegisterResponse> => {
  try {
    const res = await apiServerFetch('/expert-register-request', 'POST', { email: params.email });
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};
