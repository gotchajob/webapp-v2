import { apiServerFetch, errorSystem } from "../api-fetch";

export interface AccessRequest {}
export interface AccessResponse {
  status: string;
  responseText: string;
  data: any;
}
export const UpdateAccess = async (
  params: AccessRequest
): Promise<AccessResponse> => {
  try {
    const res = await apiServerFetch("/access", "POST", params);
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể gửi yêu cầu", {  });
  }
};
