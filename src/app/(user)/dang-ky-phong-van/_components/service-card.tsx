'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Divider, Checkbox, Typography } from '@mui/material';
import { Box, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FlexBetween, FlexBox, FlexCenter } from 'components/common/box/flex-box';
import { ContainedButton } from 'components/common/button/button';
import { PRIMARYCOLOR } from 'components/common/config';
import { ImageCard } from 'components/common/image/image-card';
import { Text } from 'components/common/text/text';
import { CustomerToken } from 'hooks/use-login';
import { formatNumber } from 'package/util';
import { ReactNode } from 'react';
import { StyledLink } from 'components/common/link/styled-link';
import { useGetCustomer } from 'hooks/use-get-current-user';
import { GetCheckBuyService } from 'package/api/customer/check-buy-service';
import { useRouter } from 'next/navigation';
import SubCard from 'ui-component/cards/SubCard';
import { PatchBuyService } from 'package/api/customer/buy-service';
import { GetBookingPrice } from 'package/api/booking/price';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetCurrentBalance } from 'hooks/use-get-balance';

const StyledText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      color="#04273B"
      fontSize={12.5}
      fontWeight={300}
      sx={{
        ':before': {
          content: `"\u2022"`,
          mr: 1
        }
      }}
    >
      {children}
    </Text>
  );
};

export const ServiceCard = () => {
  const { customerToken } = CustomerToken();

  const { customer } = useGetCustomer(customerToken);

  const [isAgree, setIsAgree] = useState<boolean>(false);

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const [bookingPrice, setBookingPrice] = useState(0);

  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

  const { balance } = useGetCurrentBalance(customerToken);

  const [openRequire, setOpenRequire] = useState(false);

  const route = useRouter();

  const fecthBookingPrice = async () => {
    try {
      const res = await GetBookingPrice();
      if (res.status !== 'success') {
        throw new Error();
      }
      setBookingPrice(res.data.price);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterClick = () => {
    if (!customerToken) {
      setOpenLoginDialog(true);
    } else {
      setOpenPaymentDialog(true);
    }
  };

  const HandleBuyService = async () => {
    try {
      if (!customerToken) {
        return;
      }
      const res = await PatchBuyService(customerToken);
      if (res.status !== 'success') {
        throw new Error();
      }
      route.push('/share-cv');
    } catch (error) {
      console.log(error);
    }
  };

  const params = {
    id: 'MockInterviewService',
    image: '/assets/images/illu-1.png',
    title: 'Mock Interview',
    rating: 5,
    totalRating: 112,
    useTime: 173,
    price: bookingPrice,
    priceDes: '1 buổi phòng vấn'
  };

  useEffect(() => {
    fecthBookingPrice();
  }, []);

  useEffect(() => {
    console.log('balance:', balance);
  }, [balance, customerToken]);

  return (
    <>
      <SubCard>
        <Grid container spacing={4} mt={5} mb={10}>
          <Grid item xs={4}>
            <FlexCenter position={'relative'} left={-21} height={'100'}>
              <ImageCard src={params.image} width={360} height={320} />
            </FlexCenter>
          </Grid>
          <Grid item xs={7.5}>
            <Text mb={1} fontSize={45} fontWeight={'700'} color={PRIMARYCOLOR}>
              {params.title}
            </Text>
            <FlexBetween
              sx={{
                display: {
                  xs: 'block',
                  sm: 'flex !important'
                }
              }}
            >
              <Text color="#b7b8b9" fontSize={12}>
                <span style={{ color: '#49a0d3' }}>{params.useTime} lượt </span> sử dụng dịch vụ
              </Text>
              <FlexBox>
                <Rating name="read-only" value={params.rating} readOnly size="small" />
                <Text color="#b7b8b9" fontSize={12} ml={1}>
                  [{params.totalRating}]
                </Text>
                <Text color="#49a0d3" sx={{ textDecoration: 'underline' }} fontSize={12} ml={2}>
                  Xem đánh giá
                </Text>
              </FlexBox>
            </FlexBetween>
            <Text my={1} fontSize={20} fontWeight={'700'} color={PRIMARYCOLOR}>
              Mô tả:
            </Text>
            <Stack spacing={1} maxHeight={150}>
              <StyledText>
                Dịch vụ phỏng vấn thử {''}
                <span style={{ fontWeight: 700 }}>mô phỏng một buổi phỏng vấn thực tế</span>. Người dùng sẽ được phỏng vấn bởi các chuyên
                gia nhiều năm trong lĩnh vực, là nhà tuyển dụng của các tập đoàn.
              </StyledText>
              <StyledText>
                Buổi phỏng vấn sẽ được {''}
                <span style={{ fontWeight: 700 }}>
                  diễn ra trong vòng 1 tiếng 30 phút với 1 tiếng để phỏng vấn và 30p dùng cho Q&A và feedback.
                </span>
              </StyledText>
              <StyledText>
                Sau buổi phỏng vấn GotchaJob sẽ đảm bảo ứng viên hiểu rõ được một buổi phỏng vấn tương tự sẽ diễn ra như thế nào, hơn thế
                nữa là nắm bắt được khả năng qua vòng phỏng vấn dựa trên kết quả phỏng vấn thử của ứng viên và đánh giá từ phía chuyên gia.
              </StyledText>
            </Stack>
            <FlexBox mt={3}>
              <FlexCenter
                py={3}
                px={3.5}
                mr={2}
                bgcolor={'#F2FAFF'}
                boxShadow="0px 6px 12px rgba(21.95, 98.70, 142.38, 0.20)"
                borderRadius={55}
                overflow="hidden"
              >
                <Text color="#0E82C4" fontWeight={700} fontSize={20}>
                  {bookingPrice === 0 ? (
                    <>
                      <CircularProgress size={18} sx={{ mr: 1 }} />
                      {params.priceDes}
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: 25 }}>{`${formatNumber(params?.price)} VND/`}</span>
                      {params.priceDes}
                    </>
                  )}
                </Text>
              </FlexCenter>
              <FlexCenter>
                <ContainedButton onClick={handleRegisterClick}>Đăng ký ngay</ContainedButton>
              </FlexCenter>
            </FlexBox>
          </Grid>
        </Grid>
      </SubCard>

      {/* Dialog đăng nhập */}
      <Dialog open={openLoginDialog} onClose={() => setOpenLoginDialog(false)} aria-labelledby="login-dialog-title">
        <DialogTitle>Thông Báo Đăng Nhập</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn cần đăng nhập để thực hiện chức năng này.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLoginDialog(false)} color="primary">
            Đóng
          </Button>
          <Button onClick={() => setOpenLoginDialog(false)} color="primary">
            Đăng nhập
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog thanh toán */}
      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)} aria-labelledby="wallet-dialog-title">
        {balance.balance < params.price ? (
          <>
            <DialogTitle>Thông Báo Số Dư Ví</DialogTitle>
            <DialogContent>
              <Box>
                <Typography variant="body1">Số dư trong ví của bạn không đủ để sử dụng dịch vụ này.</Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenPaymentDialog(false)} color="primary">
                Đóng
              </Button>
              <StyledLink href={`/account-profile/${customer?.id}`}>
                <Button color="primary">Nạp thêm</Button>
              </StyledLink>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle>Xác Nhận Đăng Ký</DialogTitle>
            <DialogContent>
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Vui lòng chấp nhận điều khoản dưới đây để đăng ký phỏng vấn CV.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'underline', cursor: 'pointer', color: 'primary.main' }}
                  onClick={() => setOpenRequire(true)}
                >
                  Điều khoản sử dụng dịch vụ
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', paddingX: 2, paddingY: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox onChange={(e, checked) => setIsAgree(checked)} checked={isAgree} sx={{ padding: 0, marginRight: 1 }} />
                <Typography variant="body2" color="primary.main">
                  Tôi đồng ý với các điều khoản sử dụng
                </Typography>
              </Box>
              <Box>
                <Button onClick={() => setOpenPaymentDialog(false)} color="primary" sx={{ marginRight: 2 }}>
                  Đóng
                </Button>
                <Button color="primary" disabled={!isAgree} onClick={HandleBuyService}>
                  Đăng ký
                </Button>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Dialog Điều khoản */}
      <Dialog open={openRequire} maxWidth="sm" fullWidth onClose={() => setOpenRequire(false)}>
        <DialogTitle color={PRIMARYCOLOR} textAlign={'center'}>
          Điều khoản khi sử dụng dịch vụ đăng kí phỏng vấn CV
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ overflowY: 'scroll' }}>
          <Box mb={2}>
            <Text fontSize={16} fontWeight={'bold'}>
              1. Điêu khoản 1
            </Text>
            <Text fontSize={14}>Tụi tui lấy tiền bạn ngay sau khi bạn bấm nút đăng ký</Text>
          </Box>
        </DialogContent>
        <DialogActions>
          <FlexBox sx={{ alignItems: 'center', flex: '1 1 auto' }}></FlexBox>
          <FlexBox sx={{ flex: '0 0 auto' }}>
            <Button onClick={() => setOpenRequire(false)} color="primary">
              Đóng
            </Button>
          </FlexBox>
        </DialogActions>
      </Dialog>
    </>
  );
};
