'use client';
import Grid from '@mui/material/Grid';
import BlogDetail from 'components/common/blog';
import { CustomerToken } from 'hooks/use-login';
import { BlogDetailData, getBlogDetail } from 'package/api/blog/id';
import { useEffect, useState } from 'react';
import { SideBlogCard } from '../_components/side-blog-card';
import Stack from '@mui/material/Stack';
import { Text } from 'components/common/text/text';
import Divider from '@mui/material/Divider';

export default function Page({ params }: { params: { id: string } }) {

  const [blog, setBlog] = useState<BlogDetailData | null>(null);

  const { customerToken } = CustomerToken();

  const getClientBlog = async () => {
    const data = await getBlogDetail({ id: +params.id.split('-')[1] }, customerToken);
    setBlog(data.data);
  };

  const blogCommentAdd = async (id: number, comment: any) => { };

  const commentAdd = async (id: number, comment: any, reply: any) => {
  };

  const handlePostLikes = async (id: number) => {
  };

  const handleCommentLikes = async (id: number, comment: any) => { };

  useEffect(() => {
    getClientBlog();
  }, []);

  if (blog) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <BlogDetail
            commentAdd={commentAdd}
            blogCommentAdd={blogCommentAdd}
            handleCommentLikes={handleCommentLikes}
            handleBlogLikes={handlePostLikes}
            blog={blog}
          />
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <Text fontSize={20} fontWeight={'500'}>
              Blog liên quan
            </Text>
            <Divider />
            {blog.relateBlog.map((relatedBlog, index) => {
              return (
                <Stack key={blog.id} spacing={2} mb={2}>
                  <SideBlogCard params={relatedBlog} />
                </Stack>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    );
  }
  return <></>;
}