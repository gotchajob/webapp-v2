// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';
import { GetUser, GetUserRequest, User } from 'package/api/user';

// assets
const Avatar1 = '/assets/images/users/avatar-1.png';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { useEffect } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';

// ==============================|| PROFILE 2 - USER PROFILE ||============================== //

const UserProfile = ({ user }: { user: User }) => {

  useEffect(() => {
    console.log(" UserProfile0, ", user)
  }, []);

  return (
    <>
      {user && (<Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt="User 1" src={user?.avatar} sx={{ height: 80, width: 80 }} />
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
                    Image size Limit should be 125kb Max.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Tên" value={user?.fullName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Địa chỉ Email" value={user.email} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Liên lạc" value={user.phone} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Địa chỉ" value={user.address} />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" spacing={3}>
            <AnimateButton>
              <Button color='error' variant="outlined" size="large">
                Bỏ thay đổi
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button variant="outlined" size="large">
                Thay đổi
              </Button>
            </AnimateButton>
          </Stack>
        </Grid>
      </Grid>)}
    </>
  );
}

export default UserProfile;
