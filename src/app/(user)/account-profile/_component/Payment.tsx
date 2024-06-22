'use client';

import React, { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';

// third-party
import { NumberFormatBase, usePatternFormat } from 'react-number-format';

// project imports
import { gridSpacing } from 'store/constant';
import { PaymentOptionsProps } from 'types/e-commerce';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import { Autocomplete, FormControl } from '@mui/material';
import PaymentSelect from 'components/application/e-commerce/Checkout/PaymentSelect';

function CardExpiry(props: any) {
  const { format, ...rest } = usePatternFormat({ ...props, format: '##/##' });

  const _format = (val: any) => {
    let month = val.substring(0, 2);
    const year = val.substring(2, 4);

    if (month.length === 1 && month[0] > 1) {
      month = `0${month[0]}`;
    } else if (month.length === 2) {
      if (Number(month) === 0) {
        month = `01`;
      } else if (Number(month) > 12) {
        month = '12';
      }
    }
    // @ts-ignore
    return format(`${month}${year}`);
  };

  return <NumberFormatBase format={_format} {...rest} />;
}

// ==============================|| PROFILE 2 - PAYMENT ||============================== //

const Payment = () => {

  const [amount, setAmount] = useState('');

  const Amounts = ["50.000", "100.000", "200.000", "500.000"];

  const [value1, setValue1] = React.useState<string | undefined>('vnpay');

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(event.target.value);
  };

  const handleChangeAmount = (event: any, newValue: any) => {
    setAmount(newValue);
    console.log("newValue:", newValue);
  };

  return (
    <Grid container spacing={gridSpacing}>
      {/*RadioGroup */}
      <Grid item xs={12} md={6}>
        <FormControl>
          <RadioGroup
            aria-label="delivery-options"
            name="delivery-options"
          >
            <Grid container spacing={gridSpacing} alignItems="center">
              {PaymentOptions.map((item: PaymentOptionsProps, index) => (
                <Grid item xs={12} key={index}>
                  <PaymentSelect item={item} />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
      {/*Collapse content */}
      <Grid item xs={12} md={6}>
        <Collapse in={value1 === 'vnpay'} sx={{ width: '100%' }}>
          {value1 === 'vnpay' && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  options={Amounts.map((option) => option.toString())}
                  value={amount}
                  onChange={handleChangeAmount}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Số tiền cần nạp"
                      fullWidth
                      onChange={(e) => handleChangeAmount(null, e.target.value)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <SubCard>
                  <TableContainer>
                    <Table sx={{ minWidth: 'auto' }} size="small" aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle1">Order Summary</Typography>
                          </TableCell>
                          <TableCell />
                        </TableRow>
                        <TableRow>
                          <TableCell>Sub Total</TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle1">{amount && amount}vnd</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Coupon Discount</TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle1">0</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ borderBottom: 'none' }}>
                            <Typography variant="subtitle1">Total</Typography>
                          </TableCell>
                          <TableCell align="right" sx={{ borderBottom: 'none' }}>
                            <Typography variant="subtitle1">{amount && amount}vnd</Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </SubCard>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end">
                  <AnimateButton>
                    <Button variant="contained" size="large" startIcon={<CreditCardTwoToneIcon />} sx={{ color: 'white' }}>
                      Nạp vào ví gotchajob
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          )}
        </Collapse>

        <Collapse in={value1 === 'momo'} sx={{ width: '100%' }}>
          {value1 === 'momo' && (
            <Grid container spacing={3} sx={{ p: 3 }}>
              <Grid item xs={12}>
                <TextField fullWidth label="Paypal Mail" defaultValue="demo@company.paypal.com" />
              </Grid>
            </Grid>
          )}
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default Payment;

const vnpay = 'https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png';
const momo = 'https://downloadr2.apkmirror.com/wp-content/uploads/2022/06/14/62a2fd170d655.png';

const PaymentOptions: PaymentOptionsProps[] = [
  {
    id: 1,
    value: 'VNPay',
    title: 'VNPay',
    caption: 'Bạn sẽ nạp tiền vào ví Gotchajob bằng VNPay để hoàn tất giao dịch mua hàng một cách an toàn.',
    image: vnpay,
    size: {
      width: 36,
      height: 36
    }
  },
  {
    id: 2,
    value: 'MoMo',
    title: 'MoMo',
    caption: 'Bạn sẽ nạp tiền vào ví Gotchajob bằng MoMo để hoàn tất giao dịch mua hàng một cách an toàn.',
    image: momo,
    size: {
      width: 36,
      height: 36
    }
  },
];
