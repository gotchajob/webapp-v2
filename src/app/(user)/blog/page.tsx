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
import { useGetSearchParams, useSearchParamsNavigation } from 'hooks/use-get-params';
import { BlogList } from 'package/api/blog';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

export default function Page() {

  //route hook
  const { push } = useSearchParamsNavigation();

  //get params
  const { category, pageNumber } = useGetSearchParams(["category", "pageNumber"]);

  //hook get blogs
  const { blogs, totalPage, loading } = useGetBlogs({ pageNumber, pageSize: 10, categoryId: category?.split("-")[1] });

  const handleChangePage = (event: any, newPage: number) => {
    push([{
      name: "pageNumber", value: newPage + ""
    }], true);
  };

  const renderBlogList = (blogList: BlogList[]) => (
    <>
      <Grid item xs={8}>
        {blogList.length > 0 ? blogList.map((blog, index) => {
          const isLastChild = index === blogList.length - 1;
          return (
            <Stack key={blog.id} spacing={2} mb={2}>
              <BlogCard params={blog} />
              {!isLastChild && <Divider />}
            </Stack>
          );
        }) : (<Typography variant="h5" align="center" sx={{ pb: 20 }}>
          Hiện chưa có bài viết nào
        </Typography>)}
        <FlexCenter sx={{ pt: 3 }}>
          <Pagination page={+pageNumber} count={totalPage} onChange={handleChangePage} shape="rounded" />
        </FlexCenter>
      </Grid>
      <Grid item xs={4}>
        <Stack spacing={2}>
          <Text fontSize={20} fontWeight={'500'}>
            Lượt xem nhiều nhất
          </Text>
          <Divider />
          {blogList.map((blog, index) => (
            <Stack key={blog.id} spacing={2} mb={2}>
              <SideBlogCard params={blog} />
            </Stack>
          ))}
        </Stack>
      </Grid>
    </>
  );

  return (
    <Grid container spacing={3}>
      {loading ? (<Grid item xs={12}>
        <Grid container spacing={3} mt={1} justifyContent="center" alignItems='center'>
          <Box>
            <CircularProgress aria-label="progress" />
          </Box>
        </Grid>
      </Grid>) : (renderBlogList(blogs))}
    </Grid>
  );
}
