// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { CustomerToken } from 'hooks/use-login';
import { useState } from 'react';
import * as yup from 'yup';
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserChangePassword } from 'package/api/user/change-password';
import { enqueueSnackbar } from 'notistack';

// ==============================|| PROFILE 2 - CHANGE PASSWORD ||============================== //

const ChangePassword = () => {
  const { customerToken } = CustomerToken();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Validation schema
  const validationSchema = yup.object().shape({
    currentPassword: yup.string().required('Mật khẩu hiện tại là bắt buộc'),
    newPassword: yup
      .string()
      .required('Mật khẩu mới là bắt buộc')
      .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự')
      .matches(/^(?=.*[0-9])/, 'Mật khẩu phải chứa ít nhất 1 chữ số (0-9)')
      .matches(/^(?=.*[A-Z])/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa (A-Z)'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Mật khẩu xác nhận phải trùng khớp')
      .required('Xác nhận mật khẩu là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await UserChangePassword(
          {
            oldPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
          customerToken
        );
        if (res.status === 'success') {
          enqueueSnackbar('Mật khẩu đã được thay đổi thành công!', { variant: 'success' });
          formik.resetForm();
        } else {
          enqueueSnackbar('Có lỗi xảy ra khi đổi mật khẩu.', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Lỗi hệ thống xảy ra khi đổi mật khẩu.', { variant: 'error' });
        console.log(error);
      }
    }
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                type={showPassword ? 'text' : 'password'}
                id="currentPassword"
                fullWidth
                label="Nhập mật khẩu hiện tại"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                fullWidth
                label="Nhập mật khẩu mới"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                helperText={formik.touched.newPassword && formik.errors.newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowNewPassword}>
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                fullWidth
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowConfirmPassword}>
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
            <Stack direction="row" spacing={2}>
              <AnimateButton>
                <Button variant="contained" type="submit">
                  Đổi mật khẩu
                </Button>
              </AnimateButton>
              <Button
                sx={{ color: 'error.main' }}
                onClick={() => formik.resetForm()}
              >
                Clear
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
