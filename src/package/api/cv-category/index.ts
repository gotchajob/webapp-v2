import { apiServerFetch, errorSystem } from '../api-fetch';

export interface CVCategoryRequest {}

export interface CVCategoryResponse {
  status: string;
  responseText: string;
  data: CVCategory[];
}

export interface CVCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export const GetCVCategory = async (params: CVCategoryRequest) => {

  try {
    const res = await apiServerFetch(`/cv-category`, 'GET');
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Lấy thông tin thất bại', []);
  }
};
