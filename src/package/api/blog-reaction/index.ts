import { accessToken } from 'mapbox-gl';
import { NumberFormatBaseProps } from 'react-number-format';
import { apiServerFetch, errorSystem } from '../api-fetch';

export interface blogReactionRq {
  blogId: number;
  userId: number;
  reactionId: number;
  rating?: number;
}

export interface blogReactionResponse {
  status: string;
  responseText: string;
}

export const PatchBlogReaction = async (params: blogReactionRq, accessToken: string): Promise<blogReactionResponse> => {
  try {
    const res = await apiServerFetch('/blog-reaction', 'PATCH', params, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Đăng nhập thất bại', '');
  }
};
