import { accessToken } from 'mapbox-gl';
import { NumberFormatBaseProps } from 'react-number-format';
import { apiServerFetch, errorSystem } from '../api-fetch';

export interface commentReactionRq {
  commentId: number;
  reactionId: number | undefined;
}

export interface commentReactionResponse {
  status: string;
  responseText: string;
}

export const PatchCommentReaction = async (params: commentReactionRq, accessToken: string): Promise<commentReactionResponse> => {
  try {
    const res = await apiServerFetch('/comment-reaction', 'PATCH', params, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Đăng nhập thất bại', '');
  }
};
