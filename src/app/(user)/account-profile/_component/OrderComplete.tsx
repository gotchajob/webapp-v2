import Image from 'next/image';
import { forwardRef } from 'react';
import Link from 'next/link';

// material-ui
import { Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Zoom, { ZoomProps } from '@mui/material/Zoom';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third-party
import { Chance } from 'chance';
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const completed = '/assets/images/e-commerce/completed.png';

const chance = new Chance();

// ==============================|| CHECKOUT CART - DISCOUNT COUPON CODE ||============================== //

const OrderComplete = ({ open, close, continueClick }: { open: boolean, close: () => void, continueClick: () => void }) => {
  const downMD = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (

    <Dialog
      open={open}
      keepMounted
      maxWidth="lg"
      sx={{
        '& .MuiDialog-paper': {
          p: 0
        }
      }}
    >
      {open && (
        <MainCard>
          <PerfectScrollbar style={{ overflowX: 'hidden', height: 'calc(100vh - 100px)' }}>
            <Grid container direction="column" spacing={gridSpacing} alignItems="center" justifyContent="center" sx={{ my: 3 }}>
              <Grid item xs={12}>
                <Typography variant={downMD ? 'h2' : 'h1'}>Thank you for order!</Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack alignItems="center" spacing={2}>
                  <Typography align="center" variant="h4" sx={{ fontWeight: 400, color: 'grey.500' }}>
                    We will send a process notification, before it delivered.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ m: 3 }}>
                <Image
                  src={completed}
                  alt="Order Complete"
                  layout="responsive"
                  width={500}
                  height={500}
                  style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Stack alignItems="center" spacing={1}>
                  <Typography variant="caption" align="center">
                    If you have any query or questions regarding purchase items, then fell to get in contact us
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ cursor: 'pointer' }}>
                    gotchajob@gmail.com
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  direction={{ xs: 'column-reverse', md: 'row' }}
                  container
                  spacing={3}
                  alignItems={{ xs: 'flex-start', md: 'center' }}
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Button variant="text" startIcon={<KeyboardBackspaceIcon />} onClick={continueClick}>
                      Tiếp tục nạp
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" fullWidth onClick={close}>
                      Đi tới lịch sử giao dịch
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </PerfectScrollbar>
        </MainCard>
      )
      }
    </Dialog >
  );
};

export default OrderComplete;
