'use client';

import { Container } from '@mui/material';
import PostComment from 'components/common/post';
import { CommentType, sampleData, PostDataType } from 'components/common/post/interface';
import { useState } from 'react';

export default function Page() {
  const [posts, setPosts] = useState<PostDataType>(sampleData.data);

  const postCommentAdd = async (postId: number, comment: CommentType) => {};

  const handlePostLikes = async (postId: Number) => {};

  const handleCommentLikes = async (postId: number, comment: CommentType) => {};
  return (
    <Container>
      <PostComment postCommentAdd={postCommentAdd} handleCommentLikes={handleCommentLikes} handlePostLikes={handlePostLikes} post={posts} />
    </Container>
  );
}
