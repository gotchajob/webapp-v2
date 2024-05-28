import { useEffect, useState } from 'react';

export const useGetCategories = (params: {}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const getClientCategories = async () => {
    const data = [
      {
        id: '123',
        name: 'Kĩ thuật phần mềm'
      },
      {
        id: '1234',
        name: 'Marketing'
      },
      {
        id: '12345',
        name: 'Quản lí nhân sự'
      }
    ];
    setCategories(data);
  };
  useEffect(() => {
    getClientCategories();
  }, []);
  return {
    categories
  };
};
