'use client';

import { useEffect, useState } from 'react';

import { CommentType, data, PostDataType } from '../../../components/common/post/interface';

import PostComment from '../../../components/common/post';

import Grid from '@mui/material/Grid';

import { Box, CircularProgress, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useGetCVShare } from 'hooks/use-get-cv-share';
import { CustomerToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import HorizontalBar from 'layout/MainLayout_plk/HorizontalBar';
import { gridSpacing } from 'store/constant - vh';

export default function Page() {

  // const [posts, setPosts] = useState<PostDataType>(data[0]);

  // const postCommentAdd = async (postId: string, comment: CommentType) => { };

  // const commentAdd = async (id: string, comment: CommentType, reply: CommentType) => { };

  // const handlePostLikes = async (postId: string) => { };

  // const handleCommentLikes = async (postId: string, comment: CommentType) => { };

  const { refresh, refreshTime } = useRefresh();

  const { customerToken } = CustomerToken();

  const { cvShare, loading: cvShareLoading } = useGetCVShare({ pageNumber: 1, pageSize: 6 }, customerToken, refreshTime);

  useEffect(() => { console.log("cvShare:", cvShare) }, [cvShare])

  return (
    <Grid container spacing={gridSpacing} mt={0}>
      <Grid item xs={2.5} borderRight={'1px solid #e2e7ef'} mt={1}>
        <HorizontalBar />
        <Divider />
      </Grid>
      <Grid item xs={0.5}></Grid>
      <Grid item xs={6} mt={4} mb={15} >
        {cvShare ? (
          cvShare.list.length > 0 ? (
            cvShare.list.map((cv, index) => (
              <Box key={index} pb={10}>
                <PostComment
                  post={cv}
                  key={index}
                />
              </Box>
            ))
          ) : (
            <Typography>Không có bài viết nào</Typography>
          )
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
}
