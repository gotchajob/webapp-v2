import { apiServerFetch, errorSystem } from '../api-fetch';

export interface CreateCVRequest {
  cvTemplateId: number;
}
export interface CreateCVResponse {
  status: string;
  responseText: string;
  data: {
    id: string;
  };
}

export const PostCreateCV = async (params: CreateCVRequest, accessToken: string): Promise<CreateCVResponse> => {
  try {
    const res = await apiServerFetch('/cv', 'POST', params, accessToken);
    console.log(res)
    return res;
  } catch (error) {
    return errorSystem('Tạo thất bại', null);
  }
};
