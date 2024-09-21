import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface BookingCurrent {
    id: number,
    expertId: number,
    customerId: number,
    startInterviewDate: string,
    endInterviewDate: string,
    status: number,
    createdAt: string,
    canCancel: true,
    expertInfo: expertInfo
}

export interface expertInfo {
    userId: 0,
    fullName: string,
    email: string,
    avatar: string
}

export interface GetBookingCurrentRes {
    status: string;
    responseText: string;
    data: BookingCurrent[];
}

export const GetBookingCurrent = async (accessToken: string): Promise<GetBookingCurrentRes> => {
    try {
        const res = await apiServerFetch(`/booking/customer/current`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};