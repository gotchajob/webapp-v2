import { GetUser, GetUserRequest, User } from 'package/api/user';
import { useEffect, useState } from 'react';

export function useGetUser(params: GetUserRequest, refresh: any) {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await GetUser(params, '');
      if (data.status == 'error') {
        throw new Error();
      }
      setUser(data.data.list);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [refresh, params]);

  return {
    user,
    loading
  };
}
