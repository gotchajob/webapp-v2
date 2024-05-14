'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import { FlexCenter } from 'components/common/box/flex-box';
import { PRIMARYCOLOR } from 'components/common/config';
import { ImageCard } from 'components/common/image/image-card';
import Link from 'next/link';
import { Text } from 'components/common/text/text';
import { PasswordVerifyForm } from 'components/common/form/forgot-password/forgot-password-verify';
import { UserCreateForgotPasswordResponse } from 'package/api/user/create-forgot-password';

// ==============================|| AUTH1 - CHECK MAIL ||============================== //

const CheckMail = ({ res, email }: { res: UserCreateForgotPasswordResponse; email: string }) => {

  return (
    <AuthWrapper1>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item justifyContent="center" alignItems={'center'} md={6} lg={7}>
          <FlexCenter>
            <Link href={'/'}>
              <ImageCard src="/assets/images/logo.png" width={'250px'} />
            </Link>
            <Box paddingY={5}>
              <Text color={PRIMARYCOLOR} textAlign={'center'} fontWeight={'700'} fontSize={30}>
                Có vẻ bạn đã quên mật khẩu?
              </Text>
              <Text mt={1} fontSize={12} textAlign={'center'} fontWeight={'700'}>
                Đừng lo, Gotcha Job sẽ giúp bạn lấy lại mật khẩu
              </Text>
            </Box>
            <PasswordVerifyForm res={res} email={email} />
          </FlexCenter>
        </Grid>
        <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
          <FlexCenter bgcolor={'#D9D9D9'} height={'100vh'}></FlexCenter>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default CheckMail;
