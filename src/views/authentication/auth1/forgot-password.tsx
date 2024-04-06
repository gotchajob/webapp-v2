'use client';

import Link from 'next/link';

// material-ui
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Text } from 'components/common/text/text';
// project imports
import AuthWrapper1 from 'components/authentication/AuthWrapper1';

// types
import { FlexCenter, FlexBox } from 'components/common/box/flex-box';
import { PRIMARYCOLOR } from 'components/common/config';
import { ForgotPasswordForm } from 'components/common/form/forgot-password/forgot-password-form';
import { ImageCard } from 'components/common/image/image-card';

// assets

// ============================|| AUTH1 - FORGOT PASSWORD ||============================ //

const ForgotPassword = () => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item justifyContent="center" alignItems={'center'} md={6} lg={7}>
          <FlexCenter mt={'50px'}>
            <ImageCard src="/assets/images/logo.png" width={'250px'} />
            <Box paddingY={5}>
              <Text color={PRIMARYCOLOR} textAlign={'center'} fontWeight={'700'} fontSize={30}>
                Có vẻ bạn đã quên mật khẩu?
              </Text>
              <Text mt={1} fontSize={12} textAlign={'center'} fontWeight={'700'}>
                Đừng lo, Gotcha Job sẽ giúp bạn lấy lại mật khẩu
              </Text>
            </Box>
            <ForgotPasswordForm />
            <Text fontSize={12} mt={25} fontWeight={'700'}>
              Chưa có tài khoản? Đăng ký {``}
              <Text
                component={Link}
                //@ts-ignore
                href={'/register'}
                fontSize={12}
                color={PRIMARYCOLOR}
                fontWeight={'700'}
                sx={{
                  textDecoration: 'underline'
                }}
              >
                tại đây
              </Text>
            </Text>
          </FlexCenter>
        </Grid>
        <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
          <FlexCenter bgcolor={'#D9D9D9'} height={'100vh'}></FlexCenter>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default ForgotPassword;
