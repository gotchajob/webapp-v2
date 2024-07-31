'use client';

import { Box, Button, Grid, Paper, Rating, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { Answer } from 'components/common/feedback/answer';
import {
  FeedbackQuestion,
  SampleFeedbackQuestion,
  FeedbackQuestionType,
  SampleFeedbackType,
  FeedbackAnwer
} from 'components/common/feedback/interface';
import { Feedback } from 'components/common/feedback/question';
import { UseGetBookingCustomerFeedbackQuestion } from 'hooks/use-get-booking-customer-feedback-question';
import { useRefresh } from 'hooks/use-refresh';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';

export default function Page() {
  const { refresh, refreshTime } = useRefresh();

  const { bookingCustomerFeedbackQuestion } = UseGetBookingCustomerFeedbackQuestion(refreshTime);

  const [answerList, setAnswerList] = useState<FeedbackAnwer[]>([]);

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
              28/07/2024 17:00 - 29/07/2024 17:30
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
              Phu Le
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <SubCard
                title="Đánh giá chuyên môn của chuyên gia về Java"
                sx={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}
              >
                <Rating />
              </SubCard>
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <SubCard
                title="Đánh giá chuyên môn của chuyên gia về Android"
                sx={{ boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' }}
              >
                <Rating />
              </SubCard>
            </Grid>
          </Grid>
          <Answer
            answerList={answerList}
            feedbackQuestionList={bookingCustomerFeedbackQuestion}
            setAnswerList={setAnswerList}
          />
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '8px',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#115293' }
              }}
            >
              Gửi phản hồi
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
