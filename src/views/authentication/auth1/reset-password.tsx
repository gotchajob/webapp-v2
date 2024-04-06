'use client';

import Link from 'next/link';

// material-ui
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthResetPassword from 'components/authentication/auth-forms/AuthResetPassword';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';
import AuthCardWrapper from 'components/authentication/AuthCardWrapper';
import Logo from 'ui-component/Logo';
import BackgroundPattern1 from 'ui-component/cards/BackgroundPattern1';
import AuthSlider from 'ui-component/cards/AuthSlider';
import { Text } from 'components/common/text/text';
// types
import { AuthSliderProps } from 'types';
import { FlexCenter } from 'components/common/box/flex-box';
import { PRIMARYCOLOR } from 'components/common/config';
import { RegisterForm } from 'components/common/form/register/register-form';
import { ImageCard } from 'components/common/image/image-card';
import { ResetPasswordForm } from 'components/common/form/forgot-password/reset-password-form';

// assets
const AuthErrorCard = '/assets/images/auth/auth-reset-error-card.svg';
const AuthPurpleCard = '/assets/images/auth/auth-reset-purple-card.svg';

// carousel items
const items: AuthSliderProps[] = [
  {
    title: 'Configurable Elements, East to Setup',
    description: 'Powerful and easy to use multipurpose theme'
  },
  {
    title: 'Configurable Elements, East to Setup',
    description: 'Powerful and easy to use multipurpose theme'
  },
  {
    title: 'Configurable Elements, East to Setup',
    description: 'Powerful and easy to use multipurpose theme'
  }
];

// ============================|| AUTH1 - RESET PASSWORD ||============================ //

const ResetPassword = ({
  searchParams
}: {
  searchParams: {
    email: string;
    code: string;
  };
}) => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

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
                Có vẻ bạn đã quên mật khẩu?
              </Text>
              <Text mt={1} fontSize={12} textAlign={'center'} fontWeight={'700'}>
                Đừng lo, Gotcha Job sẽ giúp bạn lấy lại mật khẩu
              </Text>
            </Box>
            <ResetPasswordForm email={searchParams.email} code={searchParams.code} />
          </FlexCenter>
        </Grid>
        <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
          <FlexCenter bgcolor={'#D9D9D9'} height={'100vh'}></FlexCenter>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default ResetPassword;
