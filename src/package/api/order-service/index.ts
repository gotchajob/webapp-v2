import { apiServerFetch, errorSystem } from "../api-fetch";

export interface CreateOrderServiceRequest {
  serviceId: number;
  name: string;
  phone: string;
  email: string;
  paymentId: number;
  total: number;
}
export interface CreateOrderServiceResponse {
  status: string;
  responseText: string;
  data: {
    id: string;
    email: string;
    name: string;
    phone: string;
    service: string;
    payment: string;
    status: number;
    created: string;
    total: number;
    processingBy: string;
    code: string;
  };
}
export const CreateOrderSerivce = async (
  params: CreateOrderServiceRequest
): Promise<CreateOrderServiceResponse> => {
  try {
    console.log(params)
    const res = await apiServerFetch("/order-service", "POST", params);
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể gửi yêu cầu", { token: "" });
  }
};

