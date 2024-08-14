import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetBookingCustomerFeedbackRequest {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  expertId?: number;
}
export interface GetBookingCustomerFeedbackResponse {
  status: string;
  responseText: string;
  data: {
    list: BookingCustomerFeedback[];
    totalPage: number;
  };
}

export interface BookingCustomerFeedback {
  id: number;
  bookingId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export const GetBookingCustomerFeedback = async (
  params: GetBookingCustomerFeedbackRequest
): Promise<GetBookingCustomerFeedbackResponse> => {
  try {
    const url = new URLSearchParams();
    if (params.expertId) {
      url.append('expertId', params.expertId.toString());
    }
    const res = await apiServerFetch(`/booking-customer-feedback?${url.toString()}`, 'GET');
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', { list: [], totalPage: 0 });
  }
};

export interface PostBookingCustomerFeedbackRequest {
  bookingId: number;
  rating: number;
  comment: string;
  answers: BookingAnswer[];
  skillRatings: SkillRating[];
}

export interface SkillRating {
  rating: number;
  expertSkillOptionId: number;
  comment: string;
}

export interface BookingAnswer {
  questionId: number;
  answer: string | number;
}

export interface PostBookingCustomerFeedbackResponse {
  status: string;
  responseText: string;
}

export const PostBookingCustomerFeedback = async (
  params: PostBookingCustomerFeedbackRequest,
  accessToken: string
): Promise<PostBookingCustomerFeedbackResponse> => {
  try {
    const res = await apiServerFetch(`/booking-customer-feedback`, 'POST', params, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', '');
  }
};
