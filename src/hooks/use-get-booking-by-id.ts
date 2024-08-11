import { CVCategoryById, CVCategoryByIdRequest, GetCVCategoryById } from 'package/api/cv-category/id';
import { useEffect, useState } from 'react';
import { GetCVTemplate } from './../package/api/cv-template/index';
import { BookingById, GetBookingById, GetBookingByIdRequest } from 'package/api/booking/id';

export const UseGetBookingById = (params: GetBookingByIdRequest, refresh: number) => {
  const [bookingById, setBookingById] = useState<BookingById | undefined>(undefined);

  const [loading, setLoading] = useState(false);

  const fetchBookingById = async () => {
    try {
      setLoading(true);
      const data = await GetBookingById(params);
      setBookingById(data.data);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingById();
  }, [params.id, refresh]);
  return { bookingById, loading };
};
