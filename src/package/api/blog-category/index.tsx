import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetBlogCategoryRequest {}

export interface GetBlogCategoryResponse {
  status: string;
  responseText: string;
  data: BlogCategory[];
}

export interface BlogCategory {
  id: number;
  category: string;
  description: string;
}

export const GetBlogCategory = async (params: GetBlogCategoryRequest): Promise<GetBlogCategoryResponse> => {
  try {
    const res = await apiServerFetch('/blog-category', 'GET');
    return res;
  } catch (error) {
    return errorSystem('Lỗi không thể lấy thông tin danh mục', []);
  }
};
