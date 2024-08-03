import { ExpertMatching, ExpertMatchingRequest, GetExpertMatching } from 'package/api/expert/match';
import { useEffect, useState } from 'react';

export const useGetExpertMatching = (params: ExpertMatchingRequest) => {
  const [expertMatchingList, setExpertMatchingList] = useState<ExpertMatching[]>([]);
  const getClientExpertMatching = async () => {
    try {
      const data = await GetExpertMatching(params);
      if (data.status === 'error') {
        throw new Error('');
      }
      setExpertMatchingList(data.data);
      console.log(data)
    } catch (error: any) { }
  };
  useEffect(() => {
    getClientExpertMatching();
  }, [params]);

  return {
    expertMatchingList
  };
};
