import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from '../api-fetch';

export interface PostBookingRequest {
    expertId: number,
    availabilityId: number,
    note?: string,
    customerCvId: number | null,
    bookingSkill: Skill[]
}

export interface Skill {
    id: string;
}

export interface PostBookingResponse {
    status: string;
    responseText: string;
    data: string;
}

export const PostBooking = async (params: PostBookingRequest, accessToken: string): Promise<PostBookingResponse> => {
    try {
        const res = await apiServerFetch(`/booking`, 'POST', params, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};