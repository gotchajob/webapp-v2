import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetMentorRegisterRequest {
  page: number;
  limit: number;
}

export interface GetMentorRegisterResponse {
  status: string;
  responseText: string;
  data: {
    list: MentorRegister[];
    total: number;
  };
}

export interface MentorRegister {
  id: number;
  email: string;
  createAt: string;
}

export interface PostMentorRegisterRequest {
  email: string;
}

export interface PostMentorRegisterResponse {
  status: string;
  responseText: string;
  data: string;
}

export const GetMentorRegister = async (params: GetMentorRegisterRequest, accessToken: string): Promise<GetMentorRegisterResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('page', params.page + '');
    searchParams.set('limit', params.limit + '');

    const res = await apiServerFetch('/mentor-register-request?' + searchParams.toString(), 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', { list: [], total: 0 });
  }
};

export const PostMentorRegister = async (params: PostMentorRegisterRequest, accessToken: string): Promise<PostMentorRegisterResponse> => {
  try {
    const res = await apiServerFetch('/mentor-register-request', 'POST', { email: params.email }, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};
