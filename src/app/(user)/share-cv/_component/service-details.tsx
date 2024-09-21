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
import { formatNumber } from 'package/util';
import { ReactNode } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import CircularProgress from '@mui/material/CircularProgress';

const params = {
  id: 'MockInterviewService',
  image: '/assets/images/illu-1.png',
  title: 'Mock Interview',
  rating: 5,
  totalRating: 112,
  useTime: 173
};

const StyledText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      color="#04273B"
      fontSize={13}
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

export const ServiceDetail = () => {
  return (
    <SubCard>
      <Grid container spacing={4} mt={5} mb={10}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <FlexCenter position={'relative'} left={-21} height={'100'}>
            <ImageCard src={params.image} width={360} height={320} />
          </FlexCenter>
        </Grid>
        <Grid item xs={5}>
          <Text mb={1} fontSize={45} fontWeight={'700'} color={PRIMARYCOLOR}>
            MOCK INTERVIEW
          </Text>

          <Text my={1} fontSize={20} fontWeight={'700'} color={PRIMARYCOLOR}>
            Mô tả:
          </Text>
          <Stack spacing={1} maxHeight={150}>
            <StyledText>
              Dịch vụ phỏng vấn thử {''}
              <span style={{ fontWeight: 700 }}>mô phỏng một buổi phỏng vấn thực tế</span>. Người dùng sẽ được phỏng vấn bởi các chuyên gia
              nhiều năm trong lĩnh vực, là nhà tuyển dụng của các tập đoàn.
            </StyledText>
            <StyledText>
              Sau buổi phỏng vấn GotchaJob sẽ đảm bảo ứng viên hiểu rõ được một buổi phỏng vấn tương tự sẽ diễn ra như thế nào, hơn thế nữa
              là nắm bắt được khả năng qua vòng phỏng vấn dựa trên kết quả phỏng vấn thử của ứng viên và đánh giá từ phía chuyên gia.
            </StyledText>
            <FlexCenter pt={5}>
              <ContainedButton
                onClick={() => {
                  if (document) {
                    const move = document.getElementById('movingID');
                    move?.scrollTo({ behavior: 'smooth' });
                  }
                }}
              >
                Đăng ký ngay
              </ContainedButton>
            </FlexCenter>
          </Stack>
        </Grid>
      </Grid>
    </SubCard>
  );
};
