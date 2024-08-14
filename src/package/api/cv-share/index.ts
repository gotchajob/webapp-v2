import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetCVShareReq {
    pageNumber: number;
    pageSize: number;
    sortBy?: string | null;
    search?: string[] | null;
}

export interface GetCVShareRes {
    status: string;
    responseText: string;
    data: CVShare;
}

export interface CVShare {
    list: CVs[];
    totalPage: number;
}

export interface CVs {
    id: number,
    caption: string,
    cvImage: string,
    categoryId: number,
    category: string,
    createdAt: string;
}

export const GetCVShare = async (params: GetCVShareReq, accessToken: string): Promise<GetCVShareRes> => {
    try {
        const url = new URLSearchParams();
        url.append("pageNumber", params.pageNumber + "");
        url.append("pageSize", params.pageSize + "");
        if (params.sortBy) {
            url.append("sortBy", params.sortBy + "");
        }
        if (params.search) {
            url.append("search", params.search + "");
        }
        const res = await apiServerFetch(`/cv-share?` + url, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', { list: [], totalPage: 0 });
    }
};

export interface PostCVShareReq {
    cvId: number;
    caption: string;
}

export interface PostCVShareRes {
    status: string;
    responseText: string;
    data: string;
}

export const PostCVShare = async (params: PostCVShareReq, accessToken: string): Promise<PostCVShareRes> => {
    try {
        const res = await apiServerFetch(`/cv-share`, 'POST', params, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};