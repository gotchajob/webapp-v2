import { enqueueSnackbar } from 'notistack';
import { GetCVById, GetCVByIdData } from 'package/api/cv/id';
import { useEffect, useState } from 'react';

export const useGetCVById = (id: number, accessToken: string, refreshTime: number) => {
  const [cv, setCV] = useState<GetCVByIdData | null>(null);
  const getCVById = async () => {
    try {
      const data = await GetCVById({ id }, accessToken);
      console.log(data);
      setCV(data.data);
      if (data.status === 'error') {
        throw new Error(data.responseText);
      }
    } catch (error) {
      enqueueSnackbar({
        variant: 'error',
        message: 'Không lấy được thông tin'
      });
    }
  };

  useEffect(() => {
    if (accessToken !== '') {
      getCVById();
    }
  }, [id, accessToken, refreshTime]);
  return {
    cv
  };
};
