import { apiServerFetch, errorSystem } from '../api-fetch';

export interface CVTemplateRequest {
  cvCategoryId: number;
}

export interface CVTemplateResponse {
  status: string;
  responseText: string;
  data: CVTemplate[];
}

export interface CVTemplate {
  id: number;
  cvCategoryId: number;
  name: string;
  image: string;
}

export const GetCVTemplate = async (params: CVTemplateRequest) => {
  try {
    const url = new URLSearchParams();
    url.append('categoryId', params.cvCategoryId + '');
    const res = await apiServerFetch(`/cv-template?` + url, 'GET');
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Lấy thông tin thất bại', []);
  }
};

