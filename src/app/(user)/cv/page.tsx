'use client';

import { useState } from 'react';

import { data, PostDataType, CommentType } from '../../../components/common/post/interface';

import PostComment from '../../../components/common/post';

import Grid from '@mui/material/Grid';

import { gridSpacing } from 'store/constant - vh';
import MainLayout from 'layout/MainLayout_plk';
import HorizontalBar from 'layout/MainLayout_plk/HorizontalBar';
import Divider from '@mui/material/Divider';
import { FlexBox } from 'components/common/box/flex-box';

export default function Page() {
  const [posts, setPosts] = useState<PostDataType>(data[0]);

  const postCommentAdd = async (postId: string, comment: CommentType) => {};

  const commentAdd = async (id: string, comment: CommentType, reply: CommentType) => {};

  const handlePostLikes = async (postId: string) => {};

  const handleCommentLikes = async (postId: string, comment: CommentType) => {};
  return (
    <Grid container spacing={gridSpacing} mt={0}>
      <Grid item xs={2.5} borderRight={'1px solid #e2e7ef'} mt={1}>
        <HorizontalBar />
        <Divider />
      </Grid>
      <Grid item xs={0.5}></Grid>
      <Grid item xs={6} mt={4} mb={15}>
        <PostComment
          commentAdd={commentAdd}
          postCommentAdd={postCommentAdd}
          handleCommentLikes={handleCommentLikes}
          handlePostLikes={handlePostLikes}
          post={posts}
        />
      </Grid>
    </Grid>
  );
}
