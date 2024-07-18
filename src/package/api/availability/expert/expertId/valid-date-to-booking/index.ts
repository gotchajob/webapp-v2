import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetValidDateToBookingRequest {
    expertId: number;
}

export interface GetValidDateToBookingResponse {
    status: string;
    responseText: string;
    data: ValidAvailability[];
}

export interface ValidAvailability {
    id: number;
    expertId: number;
    startTime: string;
    endTime: string;
}

export const GetValidDateToBooking = async (params: GetValidDateToBookingRequest): Promise<GetValidDateToBookingResponse> => {
    try {
        const res = await apiServerFetch(`/availability/expert/${params.expertId}/valid-date-to-booking`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};