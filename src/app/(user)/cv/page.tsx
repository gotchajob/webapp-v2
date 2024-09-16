import Grid from '@mui/material/Grid';

import HorizontalBar from 'layout/MainLayout_plk/HorizontalBar';
import { cookies } from 'next/headers';
import { apiServerFetch } from 'package/api/api-fetch';
import { getUserToken } from 'package/cookies/token';
import { gridSpacing } from 'store/constant - vh';
import { CVPost } from './_component/cv-post';
import { Suspense } from 'react';
import Container from '@mui/material/Container';

export default async function Page() {
  const accessToken = getUserToken(cookies());
  const res = await apiServerFetch('/cv-share/view', 'GET', undefined, accessToken);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={2} borderRight={'1px solid #e2e7ef'} mt={1}>
        <HorizontalBar />
      </Grid>
      <Grid item xs={10}>
        <Container maxWidth={"md"}>
          <Grid container spacing={3}>
            {res.data.list.map((post: any, index: number) => (
              <Grid item xs={12} mt={4} mb={15} key={index}>
                <CVPost postData={post} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
