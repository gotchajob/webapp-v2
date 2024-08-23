
import { BookingReportForCustomer, GetBookingReportForCustomer, GetBookingReportForCustomerRequest } from "package/api/booking-report/for-customer";
import { BookingReportById, GetBookingReportById, GetBookingReportByIdRequest } from "package/api/booking-report/id";
import { useEffect, useState } from "react";

export const UseGetBookingReportForCustomer = (params: GetBookingReportForCustomerRequest, refresh: number, accessToken: string) => {
    const [bookingReportForCustomer, setBookingReportForCustomer] = useState<{
        list: BookingReportForCustomer[];
        totalPage: number;
    }>({
        list: [],
        totalPage: 0,
    });

    const [loading, setLoading] = useState<boolean>(true);

    const fetchGetBookingReportForCustomer = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const res = await GetBookingReportForCustomer(params, accessToken);
            if (res.status !== "success") {
                throw new Error();
            }
            setBookingReportForCustomer(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchGetBookingReportForCustomer(); }, [params.pageNumber, params.pageSize, params.sortBy, refresh, accessToken])

    return {
        bookingReportForCustomer, loading
    }
}

export const UseGetBookingReportById = (params: GetBookingReportByIdRequest, refresh: number, accessToken: string) => {
    const [bookingReportById, setBookingReportById] = useState<BookingReportById>({
        id: 80,
        customerContent: "",
        customerEvidence: "",
        expertContent: "",
        expertEvidence: "",
        staffNote: "",
        processingBy: 0,
        status: 0,
        bookingId: 0,
        createdAt: "",
        updatedAt: "",
        bookingReportSuggest: [],
    });

    const [loading, setLoading] = useState<boolean>(true);

    const fetchGetBookingReportById = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const res = await GetBookingReportById(params, accessToken);
            if (res.status !== "success") {
                throw new Error();
            }
            setBookingReportById(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchGetBookingReportById(); }, [params.id, refresh, accessToken])

    return {
        bookingReportById, loading
    }
}