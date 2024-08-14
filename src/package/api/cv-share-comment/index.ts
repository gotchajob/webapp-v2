import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetCVShareCommentReq {
    pageNumber: number;
    pageSize: number;
    cvShareId: number;
    sortBy?: string | null;
}

export interface GetCVShareCommentRes {
    status: string;
    responseText: string;
    data: CVShareComment;
}

export interface CVShareComment {
    list: Comments[];
    totalPage: number;
}

export interface Comments {
    id: number,
    caption: string,
    cvImage: string,
    categoryId: number,
    category: string,
    createdAt: string;
}

export const GetCVShareComment = async (params: GetCVShareCommentReq, accessToken: string): Promise<GetCVShareCommentRes> => {
    try {
        const url = new URLSearchParams();
        url.append("pageNumber", params.pageNumber + "");
        url.append("pageSize", params.pageSize + "");
        url.append("cvShareId", params.cvShareId + "");
        if (params.sortBy) {
            url.append("sortBy", params.sortBy + "");
        }
        const res = await apiServerFetch(`/cv-comment?` + url, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', { list: [], totalPage: 0 });
    }
};

export interface PostCVShareCommentReq {
    cvShareId: number,
    comment: string;
}

export interface PostCVShareCommentRes {
    status: string;
    responseText: string;
    data: string;
}

export const PostCVShareComment = async (params: PostCVShareCommentReq, accessToken: string): Promise<PostCVShareCommentRes> => {
    try {
        const res = await apiServerFetch(`/cv-comment`, 'POST', params, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};