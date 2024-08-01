import { apiServerFetch, errorSystem } from '../../api-fetch';

export interface UpdateCVRequest {
  id: number;
  cv: string;
  name: string;
  image: string;
}
export interface UpdateCVResponse {
  status: string;
  responseText: string;
  data: string;
}

export const UpdateCV = async (params: UpdateCVRequest, accessToken: string): Promise<UpdateCVResponse> => {
  try {
    const res = await apiServerFetch(`/cv/${params.id}`, 'PATCH', params, accessToken);
    return res;
  } catch (error) {
    return errorSystem('Cập nhật thất bại', '');
  }
};

export interface GetCVByIdRequest {
  id: number;
}

export interface GetCVByIdResponse {
  status: string;
  responseText: string;
  data: GetCVByIdData
}

export interface GetCVByIdData {
  id: number;
  cvTemplateId: number;
  name: string;
  cv: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  image: string;
};

export const GetCVById = async (params: GetCVByIdRequest, accessToken: string): Promise<GetCVByIdResponse> => {
  try {
    const res = await apiServerFetch(`/cv/${params.id}`, 'GET', undefined, accessToken);
    return res
  } catch (error) {
    return errorSystem('Lấy thông tin thất bại', null);
  }
};
