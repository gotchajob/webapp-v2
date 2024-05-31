'use client';

import Container from '@mui/material/Container';
import { useGetBlogs } from 'hooks/use-get-blog';
import { useEffect, useState } from 'react';
import { BlogCard } from './_components/blog-card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MainCard from 'ui-component/cards/MainCard';
import { useGetCategories } from 'hooks/use-get-category';
import Stack from '@mui/material/Stack';
import { Text } from 'components/common/text/text';
import { PRIMARYCOLOR } from 'components/common/config';
import Iconify from 'components/iconify/iconify';
import { FlexBox, FlexCenter } from 'components/common/box/flex-box';
import Grid from '@mui/material/Grid';
import { SideBlogCard } from './_components/side-blog-card';
import { GetBlogByCategory } from 'package/api/blog/category';

export default function Page() {
  const [pageNumber, setPageNumber] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const { blogs, totalPage } = useGetBlogs({ pageNumber, pageSize });

  const flterBlogbyCategory = async () => {
    const data = await GetBlogByCategory({ categoryId: 1, limit: 10 }, '');
    console.log("flterBlogbyCategory", data.data);
  }

  useEffect(() => { flterBlogbyCategory(); }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        {blogs.map((blog, index) => {
          const isLastChild = index === blogs.length - 1;
          return (
            <Stack key={blog.id} spacing={2} mb={2}>
              <BlogCard params={blog} />
              {!isLastChild ? <Divider /> : <></>}
            </Stack>
          );
        })}
      </Grid>
      <Grid item xs={4}>
        <Stack spacing={2}>
          <Text fontSize={20} fontWeight={'500'}>
            Lượt xem nhiều nhất
          </Text>
          <Divider />
          {blogs.map((blog, index) => {
            return (
              <Stack key={blog.id} spacing={2} mb={2}>
                <SideBlogCard params={blog} />
              </Stack>
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
