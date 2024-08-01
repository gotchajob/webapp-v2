import { url } from 'inspector';
import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface VNPayCallbackRequest {
  searchParams: string;
}

export interface VNPayCallbackResponse {
  status: string;
  responseText: string;
  data: string;
}

export const GetVNPayCallback = async (params: VNPayCallbackRequest): Promise<VNPayCallbackResponse> => {
  try {
    const res = await apiServerFetch('/account/vn-pay-callback?' + params.searchParams, 'GET');
    return res;
  } catch (error) {
    return errorSystem('Lỗi không tạo được giao dịch', { paymentURL: '' });
  }
};
