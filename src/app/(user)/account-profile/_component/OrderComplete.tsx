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

const OrderComplete = ({ open, onClose }: { open: boolean, onClose: () => void }) => {

  const [step, setStep] = useState(0);

  const { vnp_Amount } = useGetSearchParams(["vnp_Amount"]);

  useEffect(() => {
    if (open) {
      setStep(0);
      const timer = setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        setStep(isSuccess ? 1 : 2);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
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
                {step === 0 && 'Đang thực hiện giao dịch'}
                {step === 1 && 'Giao dịch thành công'}
                {step === 2 && 'Giao dịch thất bại'}
              </Typography>
            </Grid>
            {step === 1 && vnp_Amount && (
              <Grid item xs={12}>
                <Typography color="success" variant={"h3"} sx={{ textAlign: "center" }}>
                  {formatNumber(vnp_Amount / 100)}vnđ
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              {step === 0 && <CircularProgress size={100} />}
              {step === 1 && <CheckCircleIcon color="success" sx={{ fontSize: 250 }} />}
              {step === 2 && <ErrorIcon color="error" sx={{ fontSize: 250 }} />}
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
            <Grid item xs={12} sx={{ pt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button variant="outlined" fullWidth onClick={onClose}>
                    Đóng
                  </Button>
                </Grid>
                {step !== 0 && (
                  <Grid item xs={6}>
                    <Button variant="contained" fullWidth onClick={onClose}>
                      {step === 1 ? 'Tiếp tục nạp' : 'Thử lại'}
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
