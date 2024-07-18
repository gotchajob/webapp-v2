import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface getCVCurrentRes {
    status: string,
    responseText: string,
    data: CVCurrent[]
}

export interface CVCurrent {
    id: 4,
    image: string,
    name: string,
    status: number,
    updatedAt: string
}

export const getCVCurrent = async (accessToken: string): Promise<getCVCurrentRes> => {
    try {
        const res = await apiServerFetch(`/cv/current`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};