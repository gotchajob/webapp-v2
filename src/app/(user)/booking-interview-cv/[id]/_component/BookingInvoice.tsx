'use client';

import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { gridSpacing } from 'store/constant';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { StyledLink } from 'components/common/link/styled-link';
import OrderComplete from '../../_component/OrderComplete';
import BookingInformationCard from '../../_component/booking-information-card';
import ExpertBookCard from '../../_component/expert-book-card';
import { PostBooking } from 'package/api/booking';
import { CustomerToken } from 'hooks/use-login';
import { LoadingButton } from '@mui/lab';
import { FlexCenter } from 'components/common/box/flex-box';
import { enqueueSnackbar } from 'notistack';

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

// const expertBooking = [
//   {
//     userId: 1,
//     fullName: 'Anshan Handgun',
//     avatar: `/assets/images/users/avatar-3.png`,
//     email: 'anshan.handgun@example.com',
//     yearExperience: 10,
//     nationSupport: [{ nation: 'USA' }, { nation: 'Canada' }],
//     point: 5,
//     bio: 'Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.',
//     skills: [{ skill: 'JavaScript' }, { skill: 'React' }]
//   }
// ];

const BookInvoicePage = ({ onBack, bookingInfo, params }: { onBack: () => void; bookingInfo: any; params: { id: string } }) => {
  const handleClose = () => {
    setComplete(false);
  };

  const [complete, setComplete] = useState(false);

  const { customerToken } = CustomerToken();

  const [isLoading, setIsLoading] = useState(false);
  const handleBooking = async () => {
    try {
      if (bookingInfo == null) {
        return;
      }
      setIsLoading(true);
      const res = await PostBooking(
        {
          availabilityId: +bookingInfo.availabilityId,
          bookingSkill: bookingInfo.bookingSkill,
          customerCvId: bookingInfo.customerCvId,
          expertId: bookingInfo.expertId,
          note: bookingInfo.note
        },
        customerToken
      );
      console.log(res);
      if (res.status === 'success') {
        setComplete(true);
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FlexCenter px={5}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Thông tin đặt lịch</Typography>
        </Grid>
        <Grid item xs={6}>
          <BookingInformationCard bookingInfo={bookingInfo} params={params} />
        </Grid>
        <Grid item xs={6}>
          <Box px={10}>
            <ExpertBookCard bookingInfo={bookingInfo} />
          </Box>
        </Grid>
        <Grid item xs={12} mt={2} px={10}>
          <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item>
              <Button
                onClick={() => {
                  if (onBack) onBack();
                }}
                color="primary"
                variant="outlined"
                startIcon={<KeyboardBackspaceIcon />}
              >
                Quay lại
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton variant="contained" onClick={handleBooking} loading={isLoading}>
                Hoàn thành đặt lịch
              </LoadingButton>
              <OrderComplete open={complete} close={handleClose} continueClick={() => { }} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FlexCenter>
  );
};

export default BookInvoicePage;
