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
import { PostExpertRegister, PostExpertRegisterRequest } from 'package/api/expert-register-request';
import useSnackbarDialog from 'components/common/snackbar-dialog/snackbar-dialog';

export const ExpertRegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();

    const router = useRouter();

    const initialValues = {
        email: ''
    };

    const handleFormSubmit = async (value: any) => {
        try {
            setIsLoading(true);
            const register = await PostExpertRegister({ email: value.email });
            if (register.status === 'success') {
                enqueueSnackbar('Đăng kí thành công, vui lòng chờ email phản hồi của chúng tôi!', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    }
                });
            }
        } catch (error: any) {
            enqueueSnackbar('Đăng ký thất bại !', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right'
                }
            });
            console.log('Đăng ký thất bại', error.message);
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
                    <Grid item xs={12}>
                        <Input
                            name="email"
                            onBlur={handleBlur}
                            value={values.email}
                            onChange={handleChange}
                            error={!!touched.email && !!errors.email}
                            helperText={(touched.email && errors.email) as string}
                            style={{ width: 380 }}
                            placeholder="Email"
                            type="email"
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
    email: yup.string().email('invalid email').required('Email is required')
});
