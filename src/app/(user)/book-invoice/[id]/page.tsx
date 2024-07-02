'use client';

import { useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import currency from 'currency.js';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

import { dispatch } from 'store';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slices/snackbar';

// types
import { CartCheckoutStateProps } from 'types/cart';
import { PaymentOptionsProps } from 'types/e-commerce';

// assets
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { setPaymentCard, setPaymentMethod } from 'store/slices/cart';
import PaymentCard from 'components/application/e-commerce/Checkout/PaymentCard';
import AddPaymentCard from 'components/application/e-commerce/Checkout/AddPaymentCard';
import OrderComplete from 'components/application/e-commerce/Checkout/OrderComplete';
import AddressCard from 'components/application/e-commerce/Checkout/AddressCard';
import PaymentOptions from 'components/application/e-commerce/Checkout/PaymentOptions';
import PaymentSelect from 'components/application/e-commerce/Checkout/PaymentSelect';
import ColorsOptions from 'components/application/e-commerce/ColorOptions';
import MainCard from 'ui-component/cards/MainCard';
import { StyledLink } from 'components/common/link/styled-link';
import ExpertBookCard from './_component/expert-book-card';
import { Autocomplete, Card, Chip, TextField } from '@mui/material';
import BookingInformationCard from './_component/booking-information-card';

const prodImage = '/assets/images/e-commerce';

// product color select
function getColor(color: string) {
  return ColorsOptions.filter((item) => item.value === color);
}

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

const expertBooking = [
  {
    userId: 1,
    fullName: 'Anshan Handgun',
    avatar: `/assets/images/users/avatar-3.png`,
    email: 'anshan.handgun@example.com',
    yearExperience: 10,
    nationSupport: [{ nation: 'USA' }, { nation: 'Canada' }],
    point: 5,
    bio: 'Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.',
    skills: [{ skill: 'JavaScript' }, { skill: 'React' }]
  }
];

const BookingInformataion = {
  expert: {
    userId: 1,
    fullName: 'Anshan Handgun',
    avatar: `/assets/images/users/avatar-3.png`,
    email: 'anshan.handgun@example.com',
    yearExperience: 10,
    nationSupport: [{ nation: 'USA' }, { nation: 'Canada' }],
    point: 5,
    bio: 'Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.',
    skills: [{ skill: 'JavaScript' }, { skill: 'React' }]
  },
  start: '2024-07-02T09:00:00',
  end: '2024-07-02T10:00:00',
  skillsExpert: [
    { label: 'ReactJS', id: 4 },
    { label: 'React Native', id: 5 }
  ],
  amount: 375000
};

interface PaymentProps {
  checkout: CartCheckoutStateProps;
  onBack: () => void;
  onNext: () => void;
  handleShippingCharge: (type: string) => void;
}

const BookInvoicePage = ({ checkout, onBack, onNext, handleShippingCharge }: PaymentProps) => {
  const [type, setType] = useState(checkout?.payment.type);
  const [payment, setPayment] = useState(checkout?.payment.method);
  const [rows, setRows] = useState(checkout?.products);
  const [cards, setCards] = useState(checkout?.payment.card);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [complete, setComplete] = useState(checkout?.step > 2);

  useEffect(() => {
    setRows(checkout?.products);
  }, [checkout?.products]);

  return (
    <MainCard px={20}>
      <Grid container spacing={gridSpacing} justifyContent="center" alignItems="center" my={5}>
        <Grid item xs={12} md={6} lg={8} xl={9}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Thông tin đặt lịch</Typography>
            </Grid>
            <Grid item xs={6}>
              <BookingInformationCard bookinginfo={BookingInformataion} />
            </Grid>
            <Grid item xs={6}>
              {expertBooking?.map((expert: any, index) => (
                <Box px={10} key={index}>
                  <ExpertBookCard expert={expert} />
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} mt={2} px={10}>
              <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                <Grid item>
                  <StyledLink href="/expert-profile/1">
                    <Button color="error" variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                      Hủy đặt lịch
                    </Button>
                  </StyledLink>
                </Grid>
                <Grid item>
                  <Button variant="contained">Hoàn thành đặt lịch</Button>
                  <OrderComplete open={complete} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default BookInvoicePage;
