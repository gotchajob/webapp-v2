'use client';
import { Text } from 'components/common/text/text';

import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { CreateVerifyResponse } from 'package/api/user/create-verify-email';
import { FlexCenter } from 'components/common/box/flex-box';
import { ContainedLoadingButton } from 'components/common/button/loading-button';
import { UserVerify, UserVerifyRequest, UserVerifyResponse } from 'package/api/user/verify-email';

// types
import { ThemeMode } from 'types/config';
import { useTheme } from '@mui/material/styles';
import OtpInput from 'react18-input-otp';

export const RegisterVerify = ({ email }: { email: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const [otp, setOtp] = useState<string>();
  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[200] : theme.palette.grey[300];
  const handleClick = async () => {
    try {
      const value: UserVerifyRequest = {
        code: '',
        email
      };
      setIsLoading(true);
      const data: UserVerifyResponse = await UserVerify(value);
      if (data.status === 'error') {
        throw new Error(data.responseText);
      }
      router.push('/register/success?name=' + data.data.fullName);
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FlexCenter>
      <Stack spacing={2.5} mb={15}>
        <Text style={{ maxWidth: '380px' }} textAlign={'center'} fontWeight={'300'} fontSize={14}>
          Nhập mã 4 chữ số được gửi tới email của bạn để xác thực.
        </Text>
        <OtpInput
          value={otp}
          onChange={(otpNumber: string) => setOtp(otpNumber)}
          numInputs={4}
          containerStyle={{ justifyContent: 'space-between' }}
          inputStyle={{
            width: '50px',
            height: '50px',
            margin: '8px',
            border: `1px solid ${borderColor}`,
            borderRadius: 50,
            ':hover': {
              borderColor: theme.palette.primary.main
            }
          }}
          focusStyle={{
            outline: 'none',
            border: `2px solid ${theme.palette.primary.main}`
          }}
        />
      </Stack>
      <ContainedLoadingButton loading={isLoading} onClick={handleClick}>
        Xác nhận
      </ContainedLoadingButton>
    </FlexCenter>
  );
};
