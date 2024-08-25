import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBookingReportForCustomerRequest {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
}

export interface GetBookingReportForCustomerResponse {
    status: string;
    responseText: string;
    data: {
        list: BookingReportForCustomer[];
        totalPage: number;
    };
}

export interface BookingReportForCustomer {
    id: number,
    customerContent: string,
    expertContent: string;
    staffNote: string;
    status: number;
    bookingId: number,
    createdAt: string,
    updatedAt: string,
    reportSuggest: bookingReportSuggest[]
}

export interface bookingReportSuggest {
    id: number;
    reportSuggestId: number;
    reportSuggest: string;
}

export const GetBookingReportForCustomer = async (params: GetBookingReportForCustomerRequest, accessToken: string): Promise<GetBookingReportForCustomerResponse> => {
    try {
        const url = new URLSearchParams();
        url.append("pageNumber", params.pageNumber + "");
        url.append("pageSize", params.pageSize + "");
        if (params.sortBy) {
            url.append("sortBy", params.sortBy + "");
        }
        const res = await apiServerFetch("/booking-report/for-customer?" + url, "GET", undefined, accessToken);
        return res;
    } catch (error) {
        return errorSystem("Lỗi không thể gửi yêu cầu", { list: [], totalPage: 0 })
    }
};