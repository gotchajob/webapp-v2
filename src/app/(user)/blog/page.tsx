'use client';

import Container from '@mui/material/Container';
import { useGetBlogs, useGetBlogsByCategory } from 'hooks/use-get-blog';
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
  const { push } = useSearchParamsNavigation();
  const { pageNumber, pageSize } = useGetSearchParams(['pageNumber', 'pageSize']);

  const [loading, setLoading] = useState<boolean>();

  //hook get blogs
  const { blogs, totalPage } = useGetBlogs({ pageNumber, pageSize });

  //get params
  const { category: paramsCategory } = useGetSearchParams(['category']);

  //hook get blogs by category
  const { blogs: blogsByCategory } = useGetBlogsByCategory({ categoryId: paramsCategory?.split('-')[1], limit: 10 });

  const renderBlogList = (blogList: BlogList[]) => (
    <>
      <Grid item xs={8}>
        {blogList.map((blog, index) => {
          const isLastChild = index === blogList.length - 1;
          return (
            <Stack key={blog.id} spacing={2} mb={2}>
              <BlogCard params={blog} />
              {!isLastChild && <Divider />}
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
          {blogList.map((blog, index) => (
            <Stack key={blog.id} spacing={2} mb={2}>
              <SideBlogCard params={blog} />
            </Stack>
          ))}
        </Stack>
      </Grid>
      <FlexCenter>
        <Pagination
          onChange={(e, page) => {
            push([
              {
                name: 'pageNumber',
                value: page + ''
              }
            ], true);
          }}
          count={totalPage + 1}
          variant="outlined"
          shape="rounded"
        />
      </FlexCenter>
    </>
  );

  // const renderContent = () => {
  //   switch (true) {
  //     case paramsCategory !== undefined && blogsByCategory.length > 0:
  //       return renderBlogList(blogsByCategory)
  //       break;
  //     case paramsCategory == undefined && blogs.length > 0:
  //       return renderBlogList(blogs);
  //       break;
  //     default:
  //       return (
  //         <Grid item xs={12}>
  //           <Typography variant="h6" align="center">
  //             Hiện chưa có bài viết nào
  //           </Typography>
  //         </Grid>

  //       );
  //   }
  // };

  const renderContent = () => {
    let content;

    switch (true) {
      case paramsCategory !== undefined && blogsByCategory.length > 0:
        content = renderBlogList(blogsByCategory);
        break;
      case paramsCategory == undefined && blogs.length > 0:
        content = renderBlogList(blogs);
        break;
      default:
        content = (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              Hiện chưa có bài viết nào
            </Typography>
          </Grid>
        );
    }

    return content;
  };

  useEffect(() => {
    setLoading(true);
    // Simulating data fetch delay
    setTimeout(() => {
      setLoading(false);
    }, 1000); // You can adjust the timeout based on your data fetching time
  }, [paramsCategory, blogs, blogsByCategory]);

  return (
    <Grid container spacing={3}>
      {loading ? (
        <Grid item xs={12}>
          <Grid container spacing={3} mt={1} justifyContent="center" alignItems="center">
            <Box>
              <CircularProgress aria-label="progress" />
            </Box>
          </Grid>
        </Grid>
      ) : (
        renderContent()
      )}
      {/* {loading && (<Grid item xs={12}>
        <Grid container spacing={3} mt={1} justifyContent="center" alignItems='center'>
          <Box>
            <CircularProgress aria-label="progress" />
          </Box>
        </Grid>
      </Grid>)}
      {renderContent()} */}
    </Grid>
  );
}
