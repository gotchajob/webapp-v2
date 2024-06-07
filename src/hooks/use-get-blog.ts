import { BlogGetRequest, BlogList, GetBlog } from 'package/api/blog';
import { useEffect, useState } from 'react';
import { CustomerToken } from './use-login';
import { BlogByCategoryReq, GetBlogByCategory } from 'package/api/blog/category';

export const useGetBlogs = (params: BlogGetRequest) => {
  const [blogs, setBlogs] = useState<BlogList[]>([]);

  const [totalPage, setTotalPage] = useState(0);

  const [loading, setLoading] = useState<boolean>(false);

  const { customerToken } = CustomerToken();

  const getClientBlogs = async () => {
    try {
      if (!params.pageNumber) {
        params.pageNumber = 1;
      }
      setLoading(true);
      const data = await GetBlog(params, customerToken);
      setBlogs(data.data.list);
      setTotalPage(data.data.totalPage);
    } catch (error: any) {
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientBlogs();
    console.log('reload');
    console.log('params.categoryId:', params.categoryId);
  }, [params.pageNumber, params.pageSize, params.categoryId]);

  return {
    blogs,
    totalPage,
    loading
  };
};
