import { apiServerFetch, errorSystem } from "../api-fetch";

export interface AdviceServiceRequest {
  fullName: string;
  phone: string;
  email: string;
  advise: string;
}
export interface AdviceServiceResponse {
  status: string;
  responseText: string;
  data: {};
}
export const AdviceService = async(params: AdviceServiceRequest): Promise<AdviceServiceResponse> => {
  try {
    const res = await apiServerFetch("/advice-service", "POST", params);
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể gửi yêu cầu", { token: "" });
  }
};
