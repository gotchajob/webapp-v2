import { BookingCustomerFeedback, GetBookingCustomerFeedback } from "package/api/booking-customer-feedback";
import { useEffect, useState } from "react";

export const UseGetBookingCustomerFeedback = () => {
    const [bookingCustomerFeedback, setBookingCustomerFeedback] = useState<BookingCustomerFeedback[]>([]);

    const [loading, setLoading] = useState();

    const fetchGetBookingCustomerFeedback = async () => {
        try {
            const res = await GetBookingCustomerFeedback({});
            if (res.status !== "success") {
                return;
            }
            setBookingCustomerFeedback(res.data.list);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchGetBookingCustomerFeedback(); }, []);

    return {
        bookingCustomerFeedback
    }
}