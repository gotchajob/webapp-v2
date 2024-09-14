import Grid from '@mui/material/Grid';

import HorizontalBar from 'layout/MainLayout_plk/HorizontalBar';
import { cookies } from 'next/headers';
import { apiServerFetch } from 'package/api/api-fetch';
import { getUserToken } from 'package/cookies/token';
import { gridSpacing } from 'store/constant - vh';
import { CVPost } from './_component/cv-post';
import { Suspense } from 'react';

export default async function Page() {
  const accessToken = getUserToken(cookies());
  const res = await apiServerFetch('/cv-share/view', 'GET', undefined, accessToken);
  return (
    <Grid container spacing={gridSpacing} mt={0}>
      <Grid item xs={2.5} borderRight={'1px solid #e2e7ef'} mt={1}>
        <HorizontalBar />
      </Grid>
      <Grid item xs={0.5}></Grid>
      <Grid item xs={9}>
        <Grid container spacing={3}>
          {res.data.list.map((post: any, index: number) => (
            <Grid item xs={6} mt={4} mb={15} key={index}>
              <CVPost postData={post} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
