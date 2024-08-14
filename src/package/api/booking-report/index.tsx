import { apiServerFetch, errorSystem } from "../api-fetch";

export interface PostBookingReportRequest {
  bookingId: number;
  content: string;
  evidence: string;
  reportSuggestIds: number[];
}
export interface PostBookingReportResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PostBookingReport = async (params: PostBookingReportRequest, accessToken: string): Promise<PostBookingReportResponse> => {
    try {
        const res = await apiServerFetch("/booking-report", "POST", params, accessToken)
        return res
    } catch (error) {
        return errorSystem("Lỗi không thể gửi yêu cầu", "")
    }
};
