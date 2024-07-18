import Image from 'next/image';
import { forwardRef, useEffect, useState } from 'react';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useGetSearchParams } from 'hooks/use-get-params';
import { CircularProgress } from '@mui/material';

const completed = '/assets/images/e-commerce/completed.png';

const chance = new Chance();

// ==============================|| CHECKOUT CART - DISCOUNT COUPON CODE ||============================== //

const OrderComplete = ({ open, transactionClick, continueClick }: { open: boolean, transactionClick: () => void, continueClick: () => void }) => {

  const [isProcessing, setIsProcessing] = useState(true);

  const { vnp_Amount } = useGetSearchParams(["vnp_Amount"]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setIsProcessing(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open]);

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
          <PerfectScrollbar style={{ overflowX: 'hidden', height: 565 }}>
            <Grid container direction="column" spacing={2} alignItems="center" justifyContent="center" sx={{ my: 1 }}>
              <Grid item xs={12}>
                {isProcessing ? (
                  <CircularProgress size={50} />
                ) : (
                  <CheckCircleIcon color="success" sx={{ fontSize: 58 }} />
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant={downMD ? 'h2' : 'h1'}>Giao dịch thành công</Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack alignItems="center" spacing={1}>
                  {vnp_Amount && (<Typography color="success" variant={downMD ? 'h2' : 'h1'} sx={{ textAlign: "center" }}>{vnp_Amount}đ</Typography>)}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s"
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
                    Nếu bạn có bất kỳ thắc mắc hoặc câu hỏi nào liên quan đến việc mua hàng, vui lòng liên hệ với chúng tôi
                  </Typography>
                  <Typography variant="subtitle1" color="primary" sx={{ cursor: 'pointer' }}>
                    gotchajob@gmail.com
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ pt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth onClick={continueClick}>
                    Đóng
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth onClick={continueClick}>
                    Tiếp tục nạp
                  </Button>
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
