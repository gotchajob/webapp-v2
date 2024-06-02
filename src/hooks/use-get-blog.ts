import { BlogGetRequest, BlogList, GetBlog } from 'package/api/blog';
import { useEffect, useState } from 'react';
import { CustomerToken } from './use-login';
import { BlogByCategoryReq, GetBlogByCategory } from 'package/api/blog/category';

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

export const useGetBlogsByCategory = (params: BlogByCategoryReq) => {
  const [blogs, setBlogs] = useState<BlogList[]>([]);

  const { customerToken } = CustomerToken();

  const getClientBlogs = async () => {
    const data = await GetBlogByCategory(params, customerToken);
    console.log('data', data.data);
    setBlogs(data.data);
  };

  useEffect(() => {
    getClientBlogs();
  }, [params.categoryId, params.limit]);

  return {
    blogs
  };
};
