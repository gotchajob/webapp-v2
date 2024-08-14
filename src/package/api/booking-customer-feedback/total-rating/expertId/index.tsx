import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetBookingCustomerTotalRatingRequest {
  expertId: number;
}
export interface GetBookingCustomerTotalRatingResponse {
  status: string;
  responseText: string;
  data: BookingTotalRating[];
}

export interface BookingTotalRating {
  rating: number;
  count: number;
}

export const GetBookingCustomerTotalRating = async (
  params: GetBookingCustomerTotalRatingRequest
): Promise<GetBookingCustomerTotalRatingResponse> => {
  try {

    const res = await apiServerFetch('/booking-customer-feedback/total-rating/' + params.expertId.toString() , 'GET');
    return res;
  } catch (error: any) {
    return errorSystem('Lỗi khong lấy được đánh giá', []);
  }
};
