import { BookingCurrent, GetBookingCurrent } from "package/api/booking/customer/current";
import { GetCheckBuyService } from "package/api/customer/check-buy-service";
import { useEffect, useState } from "react";

export const useGetCheckBuyService = (accessToken: string) => {

    const [status, setStatus] = useState<boolean>(false);

    const fetchCheckBuyService = async () => {
        try {
            const data = await GetCheckBuyService(accessToken);
            if (data.status !== "success") {
                throw new Error();
            }
            setStatus(true);
        } catch (error) {
            setStatus(false);
            console.log(error);
        }
    }

    useEffect(() => {
        if (accessToken) {
            fetchCheckBuyService();
        }
    }, [accessToken]);

    return {
        status
    }
}