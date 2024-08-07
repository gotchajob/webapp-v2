'use client';
import { FlexBetween, FlexCenter } from 'components/common/box/flex-box';
import { ImageCard } from 'components/common/image/image-card';
import { Input } from 'components/common/input/input';
import { Text } from 'components/common/text/text';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { OutlinedButton } from '../../button/button';
import { UserLoginResponse } from 'package/api/user/login';
import { apiClientFetch } from 'package/api/api-fetch';
import { PRIMARYCOLOR } from '../../config';
import { ContainedLoadingButton } from '../../button/loading-button';
import { Login } from 'hooks/use-login';
import useSnackbarDialog from 'components/common/snackbar-dialog/snackbar-dialog';

export const LoginForm = () => {
  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await Login(email, password);
      if (window) {
        window.location.href = '/';
      }
    } catch (error: any) {
      if (error.message === 'User is not verify') {
        router.push('/register/verify?email=' + email);
        enqueueSnackbar('Bạn phải xác thực email trước khi đăng nhập', {
          variant: 'error'
        });
      } else {
        enqueueSnackbar(error.message, {
          variant: 'error'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box paddingY={4} sx={{ maxWidth: '380px', width: '100%', margin: 'auto' }}>
        <Stack spacing={2.5}>
          <Input
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            placeholder="Email"
          />
          <Input
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            style={{ maxWidth: '380px' }}
            placeholder="Mật khẩu"
            type="password"
          />
        </Stack>
        <Text
          component={Link}
          //@ts-ignore
          href="/forgot-password"
          fontSize={12}
          color={PRIMARYCOLOR}
          fontWeight={'700'}
          sx={{
            textDecoration: 'underline'
          }}
        >
          Quên mật khẩu?
        </Text>
      </Box>
      <FlexCenter>
        <Stack spacing={3}>
          <FlexCenter>
            <ContainedLoadingButton loading={isLoading} onClick={handleLogin}>
              Đăng nhập
            </ContainedLoadingButton>
          </FlexCenter>
          <Divider
            sx={{
              maxWidth: 380
            }}
          >
            <Text fontSize={12} fontWeight={'700'} color={'#C1C1C1'}>
              Hoặc đăng nhập bằng
            </Text>
          </Divider>
          <FlexCenter>
            <OutlinedButton>
              <FlexBetween width={100}>
                <ImageCard width={20} src="/assets/icon/google-icon.png" />
                <Text fontSize={14} fontWeight={700} color={'black'}>
                  Google
                </Text>
              </FlexBetween>
            </OutlinedButton>
          </FlexCenter>
        </Stack>
      </FlexCenter>
    </>
  );
};
