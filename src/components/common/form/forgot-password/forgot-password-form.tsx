'use client';

import { Text } from 'components/common/text/text';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { FlexCenter } from 'components/common/box/flex-box';
import { ContainedLoadingButton } from 'components/common/button/loading-button';
import { Input } from 'components/common/input/input';
import useSnackbarDialog from 'components/common/snackbar-dialog/snackbar-dialog';

export const ForgotPasswordForm = () => {
  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    try {
      router.push('forgot-password/verify?email=' + email);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FlexCenter>
      <Stack spacing={2.5} my={5}>
        <Text style={{ maxWidth: '380px' }} textAlign={'center'} fontWeight={'300'} fontSize={14}>
          Nhập email của bạn để nhận mã xác minh, chúng tôi sẽ gửi mã gồm 4 chữ số đến email của bạn.
        </Text>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{ maxWidth: '380px' }}
          placeholder="Email"
        />
      </Stack>
      <ContainedLoadingButton disabled={email.length === 0} onClick={handleClick} loading={isLoading}>
        Tiếp tục
      </ContainedLoadingButton>
    </FlexCenter>
  );
};
