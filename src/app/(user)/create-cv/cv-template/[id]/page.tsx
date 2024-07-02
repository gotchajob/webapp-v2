'use client';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, CardContent, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { StyledLink } from 'components/common/link/styled-link';
import { CreateCV } from 'components/cv-component/cv';
import { CVCategoryByIdResponse, GetCVCategoryById } from 'package/api/cv-category/id';
import { CVTemplateResponse, GetCVTemplate } from 'package/api/cv-template';
import { CVTemplateByIdResponse, GetCVTemplateById } from 'package/api/cv-template/id';
import { useEffect, useRef, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import GuidePage from '../_component/Guide';
import SideCVTemplate from '../_component/SideCVTemplate';
import { CustomerToken } from 'hooks/use-login';
import { UseGetCVTemplate, UseGetCVTemplateById } from 'hooks/use-get-cv-template';
import { UseGetCategoryById } from 'hooks/use-get-category-by-id';
import Image from 'next/image';

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

const CVTemplatePage = ({ params }: { params: { id: string } }) => {

  const CVRef = useRef(null);

  const { customerToken } = CustomerToken();

  const { categoryById, loading: UseGetCategoryByIdLoading } = UseGetCategoryById({ id: +params.id });

  const { CVTemplateList, loading: UseGetCVTemplateLoading } = UseGetCVTemplate({ cvCategoryId: +params.id })

  const [selectId, setSelectId] = useState<number>(CVTemplateList[0]?.id);

  const handleChangeTemplate = (id: number) => {
    if (id) {
      setSelectId(id);
    }
  };

  useEffect(() => {
    if (CVTemplateList.length > 0) {
      setSelectId(+CVTemplateList[0]?.id);
    }
  }, [CVTemplateList]);

  const { CVTemplateById, loading } = UseGetCVTemplateById({ id: selectId });

  useEffect(() => { console.log("CVTemplateById:", CVTemplateById) }, [CVTemplateById]);
  
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <MainCard boxShadow hover>
        <CardContent>
          <Typography variant="h2">Mẫu CV {categoryById ? categoryById.description : ''}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Tuyển chọn các mẫu CV xin việc ấn tượng nhất. Chi tiết cách viết CV hiệu quả cùng GotchaJob.
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {CVTemplateById && CVTemplateById.templateJson !== undefined && (<CreateCV onChangeCV={() => { }} cv={JSON.parse(CVTemplateById.templateJson)} cvRef={CVRef} />)}
              <Stack direction="row" spacing={1} sx={{ mt: 8 }} justifyContent="center" alignItems="center">
                <StyledLink href={'/create-cv'}>
                  <Button variant="outlined" sx={{ minHeight: 40 }}>
                    <ArrowBackIcon sx={{ fontSize: 30, paddingX: '5px' }} />
                    Danh sách mẫu CV
                  </Button>
                </StyledLink>
                <StyledLink href={customerToken !== '' ? '/create-cv/1' : '/login'}>
                  <Button variant="contained" sx={{ minHeight: 40 }}>
                    Tạo CV với thiết kế này
                  </Button>
                </StyledLink>
              </Stack>
            </Grid>
            <Grid item xs={3}>
              <SubCard title="Lựa chọn kiểu thiết kế phù hợp với bạn nhất">
                <SideCVTemplate onChangeTemplate={handleChangeTemplate} cvTemplate={CVTemplateList ? CVTemplateList : undefined} />
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
