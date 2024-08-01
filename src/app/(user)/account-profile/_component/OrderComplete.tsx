import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon } from '@mui/icons-material';
import MainCard from 'ui-component/cards/MainCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useGetSearchParams } from 'hooks/use-get-params';

const formatNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const OrderComplete = ({ open, onClose, transactionClick, continueClick }: { open: number; onClose: () => void; transactionClick: () => void; continueClick: () => void }) => {

  const { vnp_Amount } = useGetSearchParams(["vnp_Amount"]);

  return (
    <Dialog
      open={open !== -1}
      onClose={onClose}
      maxWidth="lg"
      sx={{
        '& .MuiDialog-paper': {
          p: 0
        }
      }}
    >
      <MainCard>
        <PerfectScrollbar style={{ overflowX: 'hidden', height: 565 }}>
          <Grid container direction="column" spacing={2} alignItems="center" justifyContent="center" sx={{ my: 1 }}>
            <Grid item xs={12}>
              <Typography variant={'h2'}>
                {open === 0 && 'Đang thực hiện giao dịch'}
                {open === 1 && 'Nạp tiền thành công'}
                {open === 2 && 'Nạp tiền thất bại'}
              </Typography>
            </Grid>
            {open === 1 && vnp_Amount && (
              <Grid item xs={12}>
                <Typography color="success" variant={"h3"} sx={{ textAlign: "center" }}>
                  {formatNumber(vnp_Amount / 100)}vnđ
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              {open === 0 && <CircularProgress size={150} sx={{ my: 10 }} />}
              {open === 1 && <CheckCircleIcon color="success" sx={{ my: 5, fontSize: 200 }} />}
              {open === 2 && <ErrorIcon color="error" sx={{ my: 5, fontSize: 200 }} />}
            </Grid>
            <Grid item xs={12}>
              <Stack alignItems="center" spacing={1}>
                <Typography variant="caption" align="center">
                  Nếu bạn có bất kỳ thắc mắc hoặc câu hỏi nào liên quan đến việc mua hàng, vui lòng liên hệ với chúng tôi
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ cursor: 'pointer' }}>
                  gotchajob@gmail.com
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ pt: 3 }}>
              <Grid container spacing={5}>
                <Grid item xs={4}>
                  <Button variant="outlined" fullWidth onClick={onClose}>
                    Đóng
                  </Button>
                </Grid>
                {open !== 0 && (
                  <Grid item xs={8}>
                    <Button variant="contained" fullWidth onClick={onClose}>
                      {open === 1 ? 'Tiếp tục nạp' : 'Thử lại'}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </MainCard>
    </Dialog>
  );
};

export default OrderComplete;
