import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface CreatePaymentRequest {
  amount: number;
  backCode?: string;
}
export interface CreatePaymentResponse {
  status: string;
  responseText: string;
  data: {
    paymentURL: string;
  };
}
export const GetCreatePayment = async (params: CreatePaymentRequest, accessToken: string): Promise<CreatePaymentResponse> => {
  try {
    const url = new URLSearchParams();
    url.append('amount', params.amount + '');
    const res = await apiServerFetch('/account/create-payment?' + url.toString(), 'GET', undefined, accessToken);
    return res;
  } catch (error) {
    return errorSystem('Lỗi không tạo được giao dịch', { paymentURL: '' });
  }
};
