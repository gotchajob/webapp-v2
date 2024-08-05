import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchBookingCancelRq {
    id: number;
    reason?: string;
}

export interface PatchBookingCancelRes {
    status: string;
    responseText: string;
    data: string;
}

export const PatchBookingCancel = async (params: PatchBookingCancelRq, accessToken: string): Promise<PatchBookingCancelRes> => {
    try {
        const res = await apiServerFetch(`/booking/${params.id}/cancel`, 'PATCH', { reason: params.reason }, accessToken);
        if (res.status !== "success") {
            throw new Error();
        }
        return res;
    } catch (error: any) {
        return errorSystem('Từ chối đặt lịch thất bại', "");
    }
};