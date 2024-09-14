import { Container } from '@mui/material';
import PostComment from 'components/common/post';
import { CommentType, sampleData, PostDataType } from 'components/common/post/interface';
import { cookies } from 'next/headers';
import { apiServerFetch } from 'package/api/api-fetch';
import { getUserToken } from 'package/cookies/token';
import { useState } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const accessToken = getUserToken(cookies());
  const res = await apiServerFetch('/cv-share/' + params.id, 'GET', undefined, accessToken);
  return (
    <Container maxWidth="lg">
      <PostComment post={res.data} showTotalFeedback showAddFeedback={false} />
    </Container>
  );
}
