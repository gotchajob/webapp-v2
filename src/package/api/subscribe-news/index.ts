import { apiServerFetch, errorSystem } from "../api-fetch";

export interface SubscribeNewsRequest {
  email: string;
}
export interface SubscribeNewsResponse {
  status: string;
  responseText: string;
  data: {};
}
export const SubscribeNews = async (
  params: SubscribeNewsRequest
): Promise<SubscribeNewsResponse> => {
  try {
    const res = await apiServerFetch("/subscribe-news", "POST", params);
    throw new Error("");
    return res;
  } catch (error: any) {
    return errorSystem("Gửi thành công", {});
  }
};
