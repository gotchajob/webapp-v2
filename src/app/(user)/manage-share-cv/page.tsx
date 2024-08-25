'use client';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Text } from 'components/common/text/text';
import MainCard from 'ui-component/cards/MainCard';
import { ShareCVTable } from './_component/table';
import SubCard from 'ui-component/cards/SubCard';

export default function Page() {
  return (
    <Container maxWidth={'lg'} sx={{my: 10}}>
      <SubCard title={<Text variant="h3">Quản lí chia sẻ CV</Text>}>
        <ShareCVTable />
      </SubCard>
    </Container>
  );
}
