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

export interface PostCVTemplateRequest {
  cvCategoryId: number;
  templateJson: string;
  name: string;
  image: string;
}

export interface PostCVTemplateResponse {
  status: string;
  responseText: string;
  data: string;
}

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MTkyMzg1MjAsImV4cCI6MTcxOTI4MTcyMH0.zjFwQW7TKuLUzYs0IX5osb7oPMAlGAQAyUEJO_3WJpg';

export const PostCVTemplate = async (params: PostCVTemplateRequest) => {
  try {
    const res = await apiServerFetch(`/cv-template`, 'POST', params, token);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Lấy thông tin thất bại', []);
  }
};
