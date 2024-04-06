import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FlexCenter } from 'components/common/box/flex-box';
import { ContainedButton } from 'components/common/button/button';
import { PRIMARYCOLOR } from 'components/common/config';
import { ImageCard } from 'components/common/image/image-card';
import Link from 'next/link';
import { Text } from 'components/common/text/text';

export default function RegisterSuccess({ name }: { name: string }) {
  return (
    <FlexCenter height={"100vh"}>
      <ImageCard src="/assets/images/logo.png" width={'250px'}/>
      <Box mt={15} mb={5}>
        <Text color={PRIMARYCOLOR} textAlign={'center'} fontWeight={'700'} fontSize={30}>
          Hoàn tất!
        </Text>
        <Text mt={1} fontSize={12} textAlign={'center'} fontWeight={'700'}>
          Xin chào{' '}
          <span
            style={{
              color: PRIMARYCOLOR
            }}
          >
            {name}
          </span>
          , cùng Gotcha Job khám phá những dịch vụ thú vị nhé!
        </Text>
      </Box>
      <ContainedButton component={Link} href="/login">
        Bắt đầu
      </ContainedButton>
    </FlexCenter>
  );
}
