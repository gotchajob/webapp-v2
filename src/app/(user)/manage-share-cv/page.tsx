import Container from '@mui/material/Container';
import { apiServerFetch } from 'package/api/api-fetch';
import { getUserToken } from 'package/cookies/token';
import { cookies } from 'next/headers';
import { ShareCVTable } from './_component/table';

export default async function Page() {
  const accessToken = await getUserToken(cookies());
  const data = await apiServerFetch('/cv-share/current', 'GET', undefined, accessToken);
  console.log(data.data.list);
  return (
    <Container maxWidth={'lg'} sx={{ my: 10 }}>
      <ShareCVTable data={data.data.list} />
    </Container>
  );
}
