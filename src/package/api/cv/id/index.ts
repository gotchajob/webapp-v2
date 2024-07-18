import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface getCVByIdRq {
    id: number
}

export interface getCVByIdRes {
    status: string,
    responseText: string,
    data: CVById
}

export interface CVById {
    id: number,
    cvTemplateId: number,
    name: string,
    cv: string,
    status: number,
    createdAt: string,
    updatedAt: string
}

export const getCVById = async (params: getCVByIdRq, accessToken: string): Promise<getCVByIdRes> => {
    try {
        const res = await apiServerFetch(`/cv/${params.id}`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};