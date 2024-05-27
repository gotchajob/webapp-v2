import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetBlogCommentReq {
  id: number;
  parentCommentId: number;
  pageNumber: number;
  pageSize: number;
}

export interface Like {
  liked: Boolean;
  value: number;
}

export interface Profile {
  id: number;
  avatar: string;
  fullName: string;
}

export interface CommentList {
  id: number;
  content: string;
  createAt: string;
  reply: number;
  likes: Like;
  profile: Profile;
}

export interface GetBlogCommentRes {
  status: string;
  responseText: string;
  data: { list: CommentList[]; totalPage: number };
}

export interface PostCommentReq {
  commentId: number;
  content: string;
}

export const GetBlogComment = async (params: GetBlogCommentReq, accessToken: string): Promise<GetBlogCommentRes> => {
  try {
    const res = await apiServerFetch(`/blog/${params.id}/comment`, 'GET', undefined, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy comment thất bại', '');
  }
};


export const PostBlogComment = async (params: PostCommentReq, id: number): Promise<GetBlogCommentRes> => {
  try {
    const res = await apiServerFetch(`/blog/${id}/comment`, 'GET', params);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy comment thất bại', '');
  }
};