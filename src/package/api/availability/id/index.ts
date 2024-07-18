import { apiServerFetch, errorSystem } from "package/api/api-fetch";


export interface GetAvailabilityByIdRequest {
    id: number;
}

export interface GetAvailabilityByIdResponse {
    status: string;
    responseText: string;
    data: AvailabilityById;
}

export interface AvailabilityById {
    id: number;
    startTime: string;
    endTime: string;
}

export const GetAvailabilityById = async (params: GetAvailabilityByIdRequest): Promise<GetAvailabilityByIdResponse> => {
    try {
        const res = await apiServerFetch(`/availability/${params.id}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};