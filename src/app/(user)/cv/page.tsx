'use client';

import { useState } from 'react';

import { sampleData, PostDataType, CommentType } from '../../../components/common/post/interface';

import PostComment from '../../../components/common/post';

import Grid from '@mui/material/Grid';

import { gridSpacing } from 'store/constant - vh';
import MainLayout from 'layout/MainLayout_plk';
import HorizontalBar from 'layout/MainLayout_plk/HorizontalBar';
import Divider from '@mui/material/Divider';
import { FlexBox } from 'components/common/box/flex-box';
import { Button } from '@mui/material';
import useSnackbarDialog from 'components/common/snackbar-dialog/snackbar-dialog';

export default function Page() {
  const [posts, setPosts] = useState<PostDataType>(sampleData.data);

  const postCommentAdd = async (postId: number, comment: CommentType) => {};

  const handlePostLikes = async (postId: number) => {};

  const handleCommentLikes = async (postId: number, comment: CommentType) => {};

  return (
    <Grid container spacing={gridSpacing} mt={0}>
      <Grid item xs={2.5} borderRight={'1px solid #e2e7ef'} mt={1}>
        <HorizontalBar />
      </Grid>
      <Grid item xs={0.5}></Grid>
      <Grid item xs={6} mt={4} mb={15}>
        <PostComment
          postCommentAdd={postCommentAdd}
          handleCommentLikes={handleCommentLikes}
          handlePostLikes={handlePostLikes}
          post={posts}
        />
      </Grid>
    </Grid>
  );
}
