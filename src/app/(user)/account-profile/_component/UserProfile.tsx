// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// project imports
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';
import { GetUser, GetUserRequest, User } from 'package/api/user';
import CircularProgress from '@mui/material/CircularProgress';
// assets
const Avatar1 = '/assets/images/users/avatar-1.png';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { useEffect, useState } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Box, Button, ButtonBase, Skeleton } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { UseGetUserCurrent } from 'hooks/use-get-user-current';
import { useRefresh } from 'hooks/use-refresh';
import { CustomerToken } from 'hooks/use-login';
import { PatchUserProfile } from 'package/api/user/update-profile/indext';
import { LoadingButton } from '@mui/lab';

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const UserProfile = ({ user }: { user: User }) => {
  const { customerToken } = CustomerToken();
  const { refresh, refreshTime } = useRefresh();
  const { user: userCurrent, loading } = UseGetUserCurrent(customerToken, refreshTime);
  const [isLoading, setIsLoading] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const uploadToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my3ib4l5");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfwqbf3xr/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      throw new Error("Không thể tải ảnh lên Cloudinary");
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        enqueueSnackbar('File không hợp lệ, vui lòng chọn file ảnh', { variant: 'error' });
        return;
      }
      try {
        const cloudinaryUrl = await uploadToCloudinary(file);
        setFormData({ ...formData, avatar: cloudinaryUrl });
        setAvatarFile(file);
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      enqueueSnackbar('Vui lòng sửa các lỗi trong biểu mẫu', { variant: 'error' });
      return;
    }
    setIsLoading(true);
    try {
      const response = await PatchUserProfile(formData, customerToken);
      if (response.status === 'success') {
        enqueueSnackbar('Cập nhật thông tin thành công!', { variant: 'success' });
        refresh();
      } else {
        enqueueSnackbar('Có lỗi xảy ra khi cập nhật thông tin', { variant: 'error' });
      }
    } catch (error: any) {
      enqueueSnackbar('Cập nhật thất bại: ' + error.message, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let tempErrors = { firstName: '', lastName: '', email: '', phone: '', address: '' };
    let isValid = true;

    // Biểu thức chính quy chỉ cho phép chữ cái và khoảng trắng
    const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;

    // Kiểm tra Tên
    if (!formData.firstName) {
      tempErrors.firstName = 'Tên không được để trống';
      isValid = false;
    } else if (!nameRegex.test(formData.firstName)) {
      tempErrors.firstName = 'Tên chỉ được chứa chữ cái và khoảng trắng';
      isValid = false;
    } else if (formData.firstName.length < 2) {
      tempErrors.firstName = 'Tên quá ngắn, tối thiểu 2 ký tự';
      isValid = false;
    } else if (formData.firstName.length > 30) {
      tempErrors.firstName = 'Tên quá dài, tối đa 30 ký tự';
      isValid = false;
    }

    // Kiểm tra Họ
    if (!formData.lastName) {
      tempErrors.lastName = 'Họ không được để trống';
      isValid = false;
    } else if (!nameRegex.test(formData.lastName)) {
      tempErrors.lastName = 'Họ chỉ được chứa chữ cái và khoảng trắng';
      isValid = false;
    } else if (formData.lastName.length < 2) {
      tempErrors.lastName = 'Họ quá ngắn, tối thiểu 2 ký tự';
      isValid = false;
    } else if (formData.lastName.length > 30) {
      tempErrors.lastName = 'Họ quá dài, tối đa 30 ký tự';
      isValid = false;
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Email không hợp lệ';
      isValid = false;
    } else if (formData.email.length > 50) {
      tempErrors.email = 'Email quá dài, tối đa 50 ký tự';
      isValid = false;
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = 'Số điện thoại phải có 10-11 số';
      isValid = false;
    }

    // Kiểm tra địa chỉ
    if (!formData.address) {
      tempErrors.address = 'Địa chỉ không được để trống';
      isValid = false;
    } else if (formData.address.length < 5) {
      tempErrors.address = 'Địa chỉ quá ngắn, tối thiểu 5 ký tự';
      isValid = false;
    } else if (formData.address.length > 100) {
      tempErrors.address = 'Địa chỉ quá dài, tối đa 100 ký tự';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleResetForm = () => {
    setFormData({
      firstName: userCurrent.firstName,
      lastName: userCurrent.lastName,
      email: userCurrent.email,
      phone: userCurrent.phone,
      address: userCurrent.address,
      avatar: userCurrent.avatar,
    });
  }

  useEffect(() => {
    if (userCurrent) {
      setFormData({
        firstName: userCurrent.firstName || '',
        lastName: userCurrent.lastName || '',
        email: userCurrent.email || '',
        phone: userCurrent.phone || '',
        address: userCurrent.address || '',
        avatar: userCurrent.avatar || '',
      });
    }
  }, [userCurrent]);

  return (
    <>
      {
        loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '30vh',
            }}
          >
            <CircularProgress size={80} />
          </Box>
        ) : (
          userCurrent && (
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <ButtonBase
                      sx={{
                        overflow: 'hidden',
                        mb: 3,
                        display: 'block',
                        width: '100%',
                      }}
                      onClick={() => document.getElementById('avatarInput')?.click()}
                    >
                      {formData.avatar ? (
                        <Avatar alt="User Avatar" src={formData.avatar} sx={{ height: 80, width: 80 }} />
                      ) : (
                        <Box
                          sx={{
                            borderRadius: 50,
                            width: 80,
                            height: 80,
                            backgroundColor: '#FFFFFF',
                          }}
                        />
                      )}
                      <input
                        type="file"
                        id="avatarInput"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item sm zeroMinWidth>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <input accept="image/*" style={{ display: 'none' }} id="contained-button-file" multiple type="file" />
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption">
                          <ErrorTwoToneIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                          Hình đại diện của bạn.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Tên"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange(e)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Họ"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange(e)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Địa chỉ Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange(e)}
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange(e)}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" spacing={3}>
                  <AnimateButton>
                    <Button color='info' variant="outlined" size="large" onClick={handleResetForm}>
                      Bỏ thay đổi
                    </Button>
                  </AnimateButton>
                  <AnimateButton>
                    <LoadingButton
                      color='info'
                      variant="outlined"
                      size="large"
                      onClick={handleSubmit}
                      loading={isLoading}
                    >
                      Thay đổi
                    </LoadingButton>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          )
        )
      }
    </>
  )
}


export default UserProfile;
