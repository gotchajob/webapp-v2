'use client';
import { BlogCategory, GetBlogCategory, GetBlogCategoryRequest } from 'package/api/blog-category';
import { GetBlogByCategory } from 'package/api/blog/category';
import { useEffect, useState } from 'react';

export const useGetBlogCategory = (params: GetBlogCategoryRequest) => {
  const [blogCategory, setBlogCategory] = useState<BlogCategory[]>([]);

  const getBlogCategory = async () => {
    const data = await GetBlogCategory(params);
    setBlogCategory(data.data);
  };

  useEffect(() => {
    getBlogCategory();
  }, []);

  return {
    blogCategory
  }
};
