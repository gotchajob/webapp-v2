'use client';

import React, { useState } from 'react';
import { Box, Button, CardContent, CardHeader, Container, Divider, Grid, Typography, Stack, Paper } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import SubCard from 'ui-component/cards/SubCard';
import SideCVTemplate from './_component/SideCVTemplate';
import { StyledLink } from 'components/common/link/styled-link';
import CVCurremtTemplate from './_component/CVTemplate';
import GuidePage from './_component/Guide';

const data = [
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/prosper.png', title: 'Thành Đạt' },
  { img: 'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg', title: 'Tham Vọng' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/senior_v2.png', title: 'Senior' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/elegant.png', title: 'Thanh Lịch' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/passion.png', title: 'Đam mê' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/elegant.png', title: 'Chuyên gia' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/formal.png', title: 'Trang Trọng' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/time.png', title: 'Thời Đại' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/minimalism.png', title: 'Tối Giản' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/default_v2.png', title: 'Tiêu Chuẩn' }
];

const CVTemplatePage = () => {
  const [selectCV, setSelectCV] = useState<{ img: string; title: string } | undefined>();

  const handleChangeTemplate = (template: { img: string; title: string }) => {
    if (template) {
      const newTemplate = data.find((item) => item.title === template.title);
      setSelectCV(newTemplate);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <MainCard boxShadow hover>
        <CardContent>
          <Typography variant="h2">Mẫu CV</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Tuyển chọn các mẫu CV xin việc ấn tượng nhất. Chi tiết cách viết CV hiệu quả cùng GotchaJob.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {selectCV ? (
                <Box sx={{ textAlign: 'center' }}>
                  <Image
                    src={selectCV.img}
                    alt={selectCV.title}
                    layout="intrinsic"
                    width={800}
                    height={1890}
                    style={{
                      borderRadius: 5,
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </Box>
              ) : (
                <CVCurremtTemplate />
              )}
              <Stack direction="row" spacing={1} sx={{ mt: 8 }} justifyContent="center" alignItems="center">
                <StyledLink href={'/create-cv'}>
                  <Button variant="outlined" sx={{ minHeight: 40 }}>
                    <ArrowBackIcon sx={{ fontSize: 30, paddingX: '5px' }} />
                    Danh sách mẫu CV
                  </Button>
                </StyledLink>
                <StyledLink href={'/create-cv/1'}>
                  <Button variant="contained" sx={{ minHeight: 40 }}>
                    Tạo CV với thiết kế này
                  </Button>
                </StyledLink>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <SubCard title="Lựa chọn kiểu thiết kế phù hợp với bạn nhất">
                <SideCVTemplate onChangeTemplate={handleChangeTemplate} />
              </SubCard>
            </Grid>
          </Grid>
        </CardContent>
      </MainCard>

      <GuidePage />
    </Container>
  );
};

export default CVTemplatePage;
