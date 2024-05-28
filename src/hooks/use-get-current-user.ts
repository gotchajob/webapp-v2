import { apiClientFetch } from 'package/api/api-fetch';
import { useState, useEffect } from 'react';

export const useGetCustomer = () => {
  const [customer, setCustomer] = useState<any>(null);
  const getCustomer = async () => {
    try {
      const res = await apiClientFetch('customer-token', {});
      if (res.status === 'error') {
        throw new Error('Không thể lấy token');
      }
      const res2 = {
        id: 2,
        avatar: null,
        email: 'user@gmail.com',
        fullName: 'string null',
        phone: null,
        address: null,
        status: 0,
        createdAt: '2024-04-22T14:24:34.000+00:00'
      };
      setCustomer(res2);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    getCustomer();
  }, []);
  return {
    customer
  };
};
