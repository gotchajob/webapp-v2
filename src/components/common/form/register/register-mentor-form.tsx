'use client';
import { FlexCenter } from 'components/common/box/flex-box';
import { Input } from 'components/common/input/input';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { UserRegister, UserRegisterRequest, UserRegisterResponse } from 'package/api/user/register';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContainedLoadingButton } from 'components/common/button/loading-button';
import { VerifyPassword } from '../verify-password';
import { PostMentorRegister, PostMentorRegisterRequest } from 'package/api/mentor-register-request';

export const MentorRegisterForm = () => {

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  };

  const RegisterHandle = async (value: string) => {
    const register = await PostMentorRegister({ email: value }, '');
    console.log("POST REGISTER: ", register);
  }

  const handleFormSubmit = async (value: any) => {
    try {
      setIsLoading(true);
      const register = await PostMentorRegister({ email: value.email }, '');
      if (register.status === "success") {
        enqueueSnackbar('Mẫu đăng ký đã được gửi tới email của bạn !', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error: any) {
      enqueueSnackbar('Đăng ký thất bại !', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      console.log("Đăng ký thất bại", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema
  });

  return (
    <form onSubmit={handleSubmit}>
      <FlexCenter paddingY={4}>
        <Grid container spacing={2.5} style={{ maxWidth: '380px' }}>
          <Grid item xs={6}>
            <Input
              name="lastName"
              onBlur={handleBlur}
              value={values.lastName}
              onChange={handleChange}
              error={!!touched.lastName && !!errors.lastName}
              helperText={(touched.lastName && errors.lastName) as string}
              placeholder="Họ"
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              name="firstName"
              onBlur={handleBlur}
              value={values.firstName}
              onChange={handleChange}
              error={!!touched.firstName && !!errors.firstName}
              helperText={(touched.firstName && errors.firstName) as string}
              style={{ width: '100%' }}
              placeholder="Tên"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              error={!!touched.email && !!errors.email}
              helperText={(touched.email && errors.email) as string}
              style={{ width: '100%' }}
              placeholder="Email"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="phone"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.phone}
              error={!!touched.phone && !!errors.phone}
              helperText={(touched.phone && errors.phone) as string}
              style={{ width: "100%" }}
              placeholder="Số điện thoại"
              type="phone"
            />
          </Grid>
        </Grid>
      </FlexCenter>
      <FlexCenter>
        <ContainedLoadingButton loading={isLoading} type="submit">
          Đăng kí
        </ContainedLoadingButton>
      </FlexCenter>
    </form>
  );
};

const formSchema = yup.object().shape({
  firstName: yup.string().required('Bắt buộc'),
  lastName: yup.string().required('Bắt buộc'),
  email: yup.string().email('invalid email').required('Email is required'),
  phone: yup.string().matches(/^\d+$/, 'Số điện thoại không hợp lệ, chỉ chứa các chữ số').min(8, 'Phone number must be at least 8 characters')
    .max(12, 'Phone number must be at most 12 characters').required("Bắt buộc"),
});
