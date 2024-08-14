import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface DelCVShareReq {
    id: number;
}

export interface DelCVShareRes {
    status: string;
    responseText: string;
    data: string;
}

export const DelCVShare = async (params: DelCVShareReq, accessToken: string): Promise<DelCVShareRes> => {
    try {
        const res = await apiServerFetch(`/cv-share/${params.id}`, 'DELETE', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};

export interface PatchCVShareReq {
    id: number;
    caption: string;
}

export interface PatchCVShareRes {
    status: string;
    responseText: string;
    data: string;
}

export const PatchCVShare = async (params: PatchCVShareReq, accessToken: string): Promise<PatchCVShareRes> => {
    try {
        const res = await apiServerFetch(`/cv-share/${params.id}`, 'PATCH', { caption: params.caption }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};