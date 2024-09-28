'use client';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SubCard from 'ui-component/cards/SubCard';
import { Box, Button, Chip, CircularProgress, Dialog, DialogContent, styled, TextField } from '@mui/material';
import { FlexBox, FlexCenter } from 'components/common/box/flex-box';
import { Answer } from 'components/common/feedback/answer';
import { Feedback } from 'components/common/feedback/question';
import { Text } from 'components/common/text/text';
import { useRefresh } from 'hooks/use-refresh';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import { formatDate } from 'package/util';
import { useEffect, useState } from 'react';
import Avatar from 'ui-component/extended/Avatar';
import { CustomerToken } from 'hooks/use-login';
import { UseGetBookingById } from 'hooks/use-get-booking-by-id';
import { UseGetBookingExpertFeedbackByBooking } from 'hooks/use-get-booking-expert-feedback';
import { UseGetBookingExpertFeedbackQuestion } from 'hooks/use-get-booking-expert-feedback-question';
import { BookingFeedbackAnwer } from 'package/api/booking-expert-feedback';
import { BookingExpertFeedbackQuestion } from 'package/api/booking-expert-feedback-question';
import { ReadOnlyAnswer } from 'components/common/feedback/read-only-answer';
import { UseGetExpertById } from 'hooks/use-get-expert-profile';
import { PatchBookingCancel } from 'package/api/booking/id/cancel';

const getStatusLabel = (status: number) => {
  switch (status) {
    case 1:
      return { label: 'Chờ xác nhận của chuyên gia', color: 'warning' };
    case 2:
      return { label: 'Chờ phỏng vấn', color: 'info' };
    case 3:
      return { label: 'Đang phỏng vấn', color: 'primary' };
    case 4:
      return { label: 'Chờ phản hồi', color: 'default' };
    case 5:
      return { label: 'Hoàn thành', color: 'success' };
    case 6:
      return { label: 'Hủy bởi khách hàng', color: 'error' };
    case 7:
      return { label: 'Hủy bởi chuyên gia', color: 'error' };
    case 8:
      return { label: 'Đã bị report', color: 'error' };
    default:
      return { label: 'Trạng thái không xác định', color: 'default' };
  }
};

interface MappedSkill {
  skill: string;
  skillOption: string[];
}

const StyledChip = styled(Chip)({
  color: 'white',
  borderRadius: 10,
  minWidth: '100px'
});
export default function BookingDetailPage({ event, onBack }: { event: any; onBack: () => void }) {
  const { refresh, refreshTime } = useRefresh();

  const { customerToken } = CustomerToken();

  const { bookingExpertFeedbackByBooking } = UseGetBookingExpertFeedbackByBooking({ bookingId: +event.id }, refreshTime);

  const { bookingById } = UseGetBookingById({ id: +event.id }, refreshTime);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { bookingExpertFeedbackQuestion } = UseGetBookingExpertFeedbackQuestion(refreshTime);

  const { expertById, loading } = UseGetExpertById({ id: bookingById ? bookingById.expertId : 0 }, refreshTime);

  const [open, setOpen] = useState(false);

  const [cancelReason, setCancelReason] = useState('');

  const [isCanceling, setIsCanceling] = useState(false);

  const [comment, setComment] = useState<string>('');

  // const [selectFeedbackQuestionList, setSelectAddFeedbackQuestion] = useState<
  //     BookingExpertFeedbackQuestion[]
  // >([]);

  // const { expertQuestionCategoryCurrent } = UseGetExpertQuestionCategoryCurrent(
  //     expertToken,
  //     refreshTime
  // );

  // const [answerList, setAnswerList] = useState<BookingFeedbackAnwer[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelBooking = async () => {
    setIsCanceling(false);
    try {
      const res = await PatchBookingCancel({ id: +event.id, reason: cancelReason }, customerToken);
      if (res.status !== 'success') {
        throw new Error(res.responseText);
      }
      enqueueSnackbar('Hủy đặt lịch thành công', { variant: 'success' });
      setCancelReason("");
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  useEffect(() => {
    console.log('event:', event);
  }, []);

  useEffect(() => {
    console.log('bookingById:', bookingById);
  }, [bookingById]);

  // useEffect(() => {
  //     console.log("expertbyid:", expertById);
  // }, [expertById]);

  // useEffect(() => {
  //     console.log("bookingExpertFeedbackByBooking:", bookingExpertFeedbackByBooking);
  // }, [bookingExpertFeedbackByBooking]);

  const mappedExpertSkillOption = () => {
    const mappedSkill: MappedSkill[] = [];

    if (bookingById) {
      bookingById.skillOptionBooking.forEach((e) => {
        const index = mappedSkill.findIndex((v) => v.skill === e.skillName);
        if (index > -1) {
          mappedSkill[index].skillOption.push(e.skillOptionName);
        } else {
          mappedSkill.push({
            skill: e.skillName,
            skillOption: [e.skillOptionName]
          });
        }
      });
    }

    return (
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: 0,
            width: '0.5px',
            height: '100%',
            bgcolor: 'divider',
            zIndex: '1'
          }
        }}
      >
        {mappedSkill.map((value, index) => (
          <Stack ml={3} my={2} key={index} direction={'row'} spacing={3} alignItems={'center'}>
            <StyledChip label={value.skill} color="warning" />
            <Text>:</Text>
            {value.skillOption.map((data, index) => (
              <StyledChip label={data} key={index} color="info" />
            ))}
          </Stack>
        ))}
      </Box>
    );
  };

  return (
    <>
      {
        expertById && loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
            <CircularProgress size={50} />
          </Box >
        ) : (
          <SubCard>
            {expertById && (
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Stack spacing={2}>
                        <Typography variant="h4">Thông tin chuyên gia</Typography>
                        <Stack spacing={1}>
                          <Box display="flex" alignItems="center">
                            <Avatar alt="User 1" src={expertById.avatar} />
                            <Typography variant="body2" ml={1}>
                              {expertById.firstName} {expertById.lastName}
                            </Typography>
                          </Box>
                          <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1">Email :</Typography>
                            <Typography variant="body2">{expertById.email}</Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>
                    {bookingById && (
                      <Grid item xs={12} sm={6} md={4}>
                        <Stack spacing={2}>
                          <Typography variant="h4">Thông tin đặt lịch</Typography>
                          <Stack spacing={1}>
                            <Stack direction="row" spacing={1}>
                              <Typography variant="subtitle1">Thời gian bắt đầu:</Typography>
                              <Typography variant="body2">{formatDate(bookingById.startInterviewDate, 'yyyy-MM-dd hh:mm')}</Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                              <Typography variant="subtitle1">Thời gian kết thúc:</Typography>
                              <Typography variant="body2">{formatDate(bookingById.endInterviewDate, 'yyyy-MM-dd hh:mm')}</Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={2}>
                    <Typography variant="h4">CV khách hàng</Typography>
                    <Box onClick={handleClickOpen} sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }} width={'100%'}>
                      {bookingById?.customerCv?.image && (
                        <Image
                          src={bookingById.customerCv.image}
                          alt="Customer CV"
                          width={700}
                          height={1000}
                          style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                        />
                      )}
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                {bookingById && (
                  <Grid item xs={12}>
                    <Stack spacing={2} minHeight={100}>
                      <Typography variant="h4">Thông tin tư vấn</Typography>
                      {mappedExpertSkillOption()}
                      <SubCard title="Chú thích của khách hàng" sx={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
                        <TextField multiline minRows={3} value={bookingById.note} fullWidth disabled />
                      </SubCard>
                    </Stack>
                  </Grid>
                )}
                {bookingById && (bookingById.status === 4 || bookingById.status === 5) && (
                  <>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={3} minHeight={100}>
                        <Typography variant="h4">Câu hỏi phỏng vấn</Typography>
                        <ReadOnlyAnswer answerList={bookingExpertFeedbackByBooking.answer} />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <SubCard title="Đánh giá chung về ứng viên" sx={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
                        <TextField multiline rows={3} value={bookingExpertFeedbackByBooking.comment} fullWidth disabled />
                      </SubCard>
                    </Grid>
                  </>
                )}
                {bookingById && bookingById.status === 7 && (
                  <Grid item xs={12}>
                    <SubCard title="Lý do từ chối của chuyên gia" sx={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
                      <TextField multiline rows={3} value={bookingById.rejectReason} fullWidth disabled></TextField>
                    </SubCard>
                  </Grid>
                )}
                {bookingById && bookingById.status === 6 && (
                  <Grid item xs={12}>
                    <SubCard title="Lý do từ chối của bạn" sx={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
                      <TextField multiline rows={3} value={bookingById.rejectReason} fullWidth disabled></TextField>
                    </SubCard>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="space-between" mt={4}>
                    <Button variant="outlined" onClick={onBack}>
                      Quay lại
                    </Button>
                    {bookingById && bookingById.canCancel && (
                      <Button variant="contained" color="primary" onClick={() => setIsCanceling(!isCanceling)}>
                        Hủy đặt lịch
                      </Button>
                    )}
                  </Stack>
                </Grid>
                {isCanceling && (
                  <Grid item xs={12} mt={3}>
                    <TextField
                      label="Lý do"
                      multiline
                      rows={3}
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      fullWidth
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                      <Button variant="outlined" onClick={() => setIsCanceling(false)}>
                        Đóng
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleCancelBooking}>
                        Xác nhận
                      </Button>
                    </Stack>
                  </Grid>
                )}
              </Grid>
            )}

            <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogContent>
                <Image
                  src={bookingById?.customerCv.image || ''}
                  alt="Customer CV"
                  layout="intrinsic"
                  width={700}
                  height={1000}
                  objectFit="cover"
                  objectPosition="top"
                  style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                />
              </DialogContent>
            </Dialog>
          </SubCard>
        )
      }
    </>
  );
}
