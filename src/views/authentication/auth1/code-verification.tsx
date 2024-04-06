'use client';

import Link from 'next/link';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project imports
import AuthWrapper1 from 'components/authentication/AuthWrapper1';

// types
import { AuthSliderProps } from 'types';
import { FlexCenter } from 'components/common/box/flex-box';
import { ImageCard } from 'components/common/image/image-card';

//component
import { Text } from 'components/common/text/text';
import { PRIMARYCOLOR } from 'components/common/config';

import { LoginForm } from 'components/common/form/login/login-form';
import { RegisterVerify } from 'components/common/form/register/register-verify';
// ===========================|| AUTH1 - CODE VERIFICATION ||=========================== //

const CodeVerification = () => {
  return (
    <AuthWrapper1>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item justifyContent="center" alignItems={'center'} md={6} lg={7}>
          <FlexCenter>
            <Link href={'/'}>
              <ImageCard src="/assets/images/logo.png" width={'250px'} />
            </Link>
            <Box py={5}>
              <Text color={PRIMARYCOLOR} textAlign={'center'} fontWeight={'700'} fontSize={30}>
                Gần xong rồi!
              </Text>
              <Text mt={1} fontSize={12} textAlign={'center'} fontWeight={'700'}>
                Xác nhận để thiết lập tài khoản
              </Text>
            </Box>
            <RegisterVerify email=""/>
          </FlexCenter>
        </Grid>
        <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
          <FlexCenter bgcolor={'#D9D9D9'} height={'100vh'}></FlexCenter>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default CodeVerification;
