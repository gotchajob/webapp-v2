import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface CVCategoryByIdRequest {
    id: number;
}

export interface CVCategoryByIdResponse {
    status: string;
    responseText: string;
    data: CVCategoryById;
}

export interface CVCategoryById {
    id: number;
    name: string;
    description: string;
    image: string;
    icon: string;
}

export const GetCVCategoryById = async (params: CVCategoryByIdRequest) => {
    try {
        const searchParams = new URLSearchParams();
        searchParams.append("id", params.id + '');
        const res = await apiServerFetch(`/cv-category/${params.id}`, 'GET');
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Lấy thông tin thất bại', []);
    }
};