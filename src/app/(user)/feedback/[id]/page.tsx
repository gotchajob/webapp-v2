'use client';

import { Box, Button, CircularProgress, Grid, Paper, Rating, Stack, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { Answer } from 'components/common/feedback/answer';
import {
  FeedbackAnwer
} from 'components/common/feedback/interface';
import { UseGetBookingById } from 'hooks/use-get-booking-by-id';
import { UseGetBookingCustomerFeedbackQuestion } from 'hooks/use-get-booking-customer-feedback-question';
import { UseGetExpertById } from 'hooks/use-get-expert-profile';
import { CustomerToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import { enqueueSnackbar } from 'notistack';
import { BookingAnswer, PostBookingCustomerFeedback, SkillRating } from 'package/api/booking-customer-feedback-controller';
import { formatDate } from 'package/util';
import { useEffect, useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';

export default function FeedBackDetailPage({ params }: { params: { id: string } }) {

  const { customerToken } = CustomerToken();

  const { refresh, refreshTime } = useRefresh();

  const { bookingById } = UseGetBookingById({ id: +params.id }, refreshTime);

  const { bookingCustomerFeedbackQuestion } = UseGetBookingCustomerFeedbackQuestion(refreshTime);

  const { expertById, loading } = UseGetExpertById({ id: bookingById ? bookingById.expertId : 0 }, refreshTime);

  const [answerList, setAnswerList] = useState<BookingAnswer[]>([]);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");

  const [rating, setRating] = useState<number>(0);

  const [skillRatings, setSkillRatings] = useState<SkillRating[]>([])

  // useEffect(() => { console.log("answerList:", answerList) }, [answerList]);

  // useEffect(() => { console.log("bookingById:", bookingById) }, [bookingById]);

  useEffect(() => { console.log("skillRatings:", skillRatings) }, [skillRatings]);

  // useEffect(() => { console.log("expertById:", expertById) }, [expertById]);

  const hanldeSumbitFeedback = async () => {
    if (!answerList) {
      return;
    }
    setLoadingSubmit(true);
    try {
      if (!customerToken) {
        throw new Error("Cần đăng nhập");
      }
      const res = await PostBookingCustomerFeedback({ bookingId: +params.id, rating, comment, answers: answerList, skillRatings }, customerToken);
      console.log(res);
      if (res.status !== "success") {
        throw new Error();
      }
      enqueueSnackbar("Phản hồi thành công", { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Phản hồi thất bại", { variant: 'error' });
    } finally {
      setLoadingSubmit(false);
    }
  }


  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Paper
          sx={{
            p: 4,
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: 2
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: '#0d47a1' }}
          >
            Đơn Phản Hồi Buổi Phỏng Vấn
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{ mb: 1, color: '#1565c0' }}
            >
              Thời gian buổi phỏng vấn
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 2, color: '#424242' }}
            >
              {formatDate(bookingById ? bookingById.startInterviewDate : '', "dd/MM/yyyy hh:mm")} ⎯ {formatDate(bookingById ? bookingById.endInterviewDate : '', "dd/MM/yyyy hh:mm")}
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 1, color: '#1565c0' }}
            >
              Phỏng vấn với chuyên gia
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#424242' }}
            >
              {expertById?.firstName} {expertById?.lastName}
            </Typography>
          </Box>
          <Grid container spacing={3} mb={3}>
            {bookingById && bookingById.skillOptionBooking?.map((skillOption, index) => {
              return (
                <Grid item xs={12} key={index}>
                  <SubCard
                    title={`Đánh giá chuyên môn của chuyên gia về ${skillOption.skillOptionName}`}
                    sx={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}
                  >
                    <Rating
                      onChange={(e, value) => {
                        if (value) {
                          setSkillRatings((prev) => {
                            const existingIndex = prev.findIndex(
                              (rating) => rating.expertSkillOptionId === skillOption.skillOptionId
                            );

                            if (existingIndex >= 0) {
                              const updatedRatings = [...prev];
                              updatedRatings[existingIndex].rating = value;
                              return updatedRatings;
                            } else {
                              return [...prev, { rating: value, expertSkillOptionId: skillOption.skillOptionId }];
                            }
                          });
                        }
                      }}
                    />
                  </SubCard>
                </Grid>
              );
            })}
          </Grid>
          <Answer
            answerList={answerList}
            feedbackQuestionList={bookingCustomerFeedbackQuestion}
            setAnswerList={setAnswerList}
          />
          <Grid item xs={12} mt={3}>
            <SubCard
              title="Đánh giá chung về chuyên gia"
              sx={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}>
              <Stack direction="column" spacing={3}>
                <Rating onChange={(e, value) => { if (value) { setRating(value) } }} />
                <TextField
                  label="Ý kiến của bạn"
                  multiline
                  variant="filled"
                  rows={3}
                  value={comment}
                  fullWidth
                  onChange={(e) => setComment(e.target.value)}
                ></TextField>
              </Stack>
            </SubCard>
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={hanldeSumbitFeedback}
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '8px',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#115293' }
              }}
            >
              {loadingSubmit ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Gửi phản hồi'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box >
  );
}
