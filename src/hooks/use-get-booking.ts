import { BookingCurrent, GetBookingCurrent } from "package/api/booking/customer/current";
import { useEffect, useState } from "react";

export const useGetBookingCurrent = (accessToken: string, refreshTime: any) => {
    const [bookings, setBookings] = useState<BookingCurrent[]>();

    const [loading, setLoading] = useState<boolean>(false);

    const fetchBookingsCurrent = async () => {
        try {
            setLoading(true);
            const data = await GetBookingCurrent(accessToken);
            setBookings(data.data);

        } catch (error) {
        } finally {
            setLoading(false);
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