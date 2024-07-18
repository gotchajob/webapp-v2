import { BookingCurrent, GetBookingCurrent } from "package/api/booking/customer/current";
import { useEffect, useState } from "react";


export const useGetBookingCurrent = (accessToken: string, refreshTime: any) => {
    const [bookings, setBookings] = useState<BookingCurrent[]>();

    const [loading, setLoading] = useState<boolean>();

    const fetchBookingsCurrent = async () => {
        try {
            setLoading(true);
            const data = await GetBookingCurrent(accessToken);
            setBookings(data.data);
            setLoading(false);
        } catch (error) {
        }
    }

    useEffect(() => {
        if (accessToken) {
            fetchBookingsCurrent();
        }
    }, [accessToken, refreshTime]);

    return {
        bookings, loading
    }
}