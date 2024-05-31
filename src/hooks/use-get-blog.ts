import { BlogGetRequest, BlogList, GetBlog } from 'package/api/blog';
import { useEffect, useState } from 'react';
import { CustomerToken } from './use-login';

export const useGetBlogs = (params: BlogGetRequest) => {
  const [blogs, setBlogs] = useState<BlogList[]>([]);

  const [totalPage, setTotalPage] = useState(0);

  const { customerToken } = CustomerToken();

  const getClientBlogs = async () => {
    const data = await GetBlog(params, customerToken);
    setBlogs(data.data.list);
    setTotalPage(data.data.totalPage);
  };

  useEffect(() => {
    getClientBlogs();
  }, [params.pageNumber, params.pageSize]);

  return {
    blogs,
    totalPage
  };
};
