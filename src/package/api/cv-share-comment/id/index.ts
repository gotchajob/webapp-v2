import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetCVShareCommentByIdReq {
    id: number,
}

export interface GetCVShareCommentByIdRes {
    status: string;
    responseText: string;
    data: { list: [], totalPage: 0 };
}

export const GetCVShareCommentById = async (params: GetCVShareCommentByIdReq): Promise<GetCVShareCommentByIdRes> => {
    try {
        const res = await apiServerFetch(`/cv-comment/${params.id}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};

export interface DelCVShareCommentReq {
    id: number,
}

export interface DelCVShareCommentRes {
    status: string;
    responseText: string;
    data: string;
}

export const DelCVShareComment = async (params: DelCVShareCommentReq, accessToken: string): Promise<DelCVShareCommentRes> => {
    try {
        const res = await apiServerFetch(`/cv-comment/${params.id}`, 'DELETE', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};

export interface PatchCVShareCommentReq {
    id: number,
    comment: string;
}

export interface PatchCVShareCommentRes {
    status: string;
    responseText: string;
    data: string;
}

export const PatchCVShareComment = async (params: PatchCVShareCommentReq, accessToken: string): Promise<PatchCVShareCommentRes> => {
    try {
        const res = await apiServerFetch(`/cv-comment/${params.id}`, 'PATCH', { comment: params.comment }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};