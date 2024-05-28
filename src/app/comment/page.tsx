'use client';
import Container from '@mui/material/Container';
import PostComment from 'components/common/comment';
import { data, PostDataType, CommentType } from 'components/common/comment/interface';

import { useState } from 'react';

export default function Page() {
  const [posts, setPosts] = useState<PostDataType>(data[0]);

  const postCommentAdd = async (postId: string, comment: CommentType) => {}

  const commentAdd = async (id: string, comment: CommentType, reply: CommentType) => {};

  const handlePostLikes = async (postId: string) => {};

  const handleCommentLikes = async (postId: string, comment: CommentType) => {};

  return (
    <Container maxWidth="md" sx={{ bgcolor: '#eef2f6' }}>
      <PostComment
        commentAdd={commentAdd}
        postCommentAdd={postCommentAdd}
        handleCommentLikes={handleCommentLikes}
        handlePostLikes={handlePostLikes}
        post={posts}
      />
    </Container>
  );
}
