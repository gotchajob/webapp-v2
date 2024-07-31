
import { CurrentBalance, GetCurrentBalance } from "package/api/account/current/balance";
import { useEffect, useState } from "react";

export const useGetCurrentBalance = (accessToken: string) => {
    const [balance, setBalance] = useState<CurrentBalance>({ balance: 0 });

    const fetchCurrentBalance = async () => {
        try {
            const data = await GetCurrentBalance(accessToken);
            setBalance(data.data);
        } catch (error) {
            throw new Error();
        }
    }

    useEffect(() => { fetchCurrentBalance() }, [accessToken]);

    return {
        balance
    }
}