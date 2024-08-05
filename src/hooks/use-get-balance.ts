import { CurrentBalance, GetCurrentBalance } from 'package/api/account/current/balance';
import { useEffect, useState } from 'react';

export const useGetCurrentBalance = (accessToken: string) => {
  const [balance, setBalance] = useState<CurrentBalance>({ balance: 0 });

  const [loading, setLoading] = useState(true);

  const fetchCurrentBalance = async () => {
    try {
      setLoading(true);
      const data = await GetCurrentBalance(accessToken);
      setBalance(data.data);
    } catch (error) {
      console.error('Failed to fetch balance', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentBalance();
  }, [accessToken]);

  return {
    balance,
    loading
  };
};
