'use client';

import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Pagination,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import WorkIcon from '@mui/icons-material/Work';
import { StyledLink } from 'components/common/link/styled-link';
import Image from 'next/image';
import SubCard from 'ui-component/cards/SubCard';
import { PRIMARYCOLOR } from 'components/common/config';

const url = 'https://d3vpszern3jgjo.cloudfront.net/wp-content/uploads/2021/08/resume-reading-768x432.png';

const data = [
  {
    title: 'IT',
    job: 'Backend Development',
    url: 'https://example.com/it-backend'
  },
  {
    title: 'IT',
    job: 'Frontend Development',
    url: 'https://example.com/it-frontend'
  },
  {
    title: 'Business',
    job: 'Marketing',
    url: 'https://example.com/business-marketing'
  },
  {
    title: 'Business',
    job: 'Product Management',
    url: 'https://example.com/business-product-management'
  },
  {
    title: 'Healthcare',
    job: 'Internal Medicine Doctor',
    url: 'https://example.com/healthcare-internal-medicine'
  },
  {
    title: 'Healthcare',
    job: 'Nurse',
    url: 'https://example.com/healthcare-nurse'
  },
  {
    title: 'Education',
    job: 'Elementary School Teacher',
    url: 'https://example.com/education-elementary-teacher'
  },
  {
    title: 'Art',
    job: 'Miss Universe',
    url: 'https://example.com/art-miss-universe'
  },
  {
    title: 'Art',
    job: 'Comedian',
    url: 'https://example.com/art-comedian'
  },
  {
    title: 'Construction',
    job: 'Architect',
    url: 'https://example.com/construction-architect'
  },
  {
    title: 'Construction',
    job: 'Civil Engineer',
    url: 'https://example.com/construction-civil-engineer'
  },
  {
    title: 'Sports',
    job: 'Football Player',
    url: 'https://example.com/sports-football-player'
  },
  {
    title: 'Sports',
    job: 'Fitness Trainer',
    url: 'https://example.com/sports-fitness-trainer'
  },
  {
    title: 'Fashion',
    job: 'Fashion Designer',
    url: 'https://example.com/fashion-fashion-designer'
  },
  {
    title: 'Fashion',
    job: 'Model',
    url: 'https://example.com/fashion-model'
  }
];

const data_2 = [
  { title: 'IT' },
  { title: 'Business' },
  { title: 'Healthcare' },
  { title: 'Sports' },
  { title: 'Fashion' },
  { title: 'Art' },
  { title: 'Education' },
  { title: 'Fashion' }
];

export default function Page() {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '300px',
          backgroundColor: '#0D2538',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${url})`,
          backgroundSize: '100% 400px',
          backgroundPosition: 'center',
          position: 'relative',
          textAlign: 'flex-start'
        }}
      >
        <Stack
          spacing={3}
          sx={{
            position: 'absolute',
            paddingTop: 10,
            paddingLeft: 10
          }}
        >
          <Typography variant="h1" sx={{ color: '#F3F5F7' }}>
            Danh sách mẫu CV xin việc chuẩn 2024
          </Typography>
          <Typography variant="h3" sx={{ color: '#F3F5F7' }}>
            Các mẫu CV được thiết kế chuẩn theo từng ngành nghề.
          </Typography>
          <Typography variant="h3" sx={{ color: '#F3F5F7' }}>
            Phù hợp với cả sinh viên và người đi làm.
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ paddingX: 20, paddingY: 2 }}>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item xs={12} sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: 25, color: '#1E88E5' }}>
              Mẫu CV theo vị trí ứng tuyển
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              options={data_2}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Tìm kiếm theo ngành nghề" />}
              sx={{ maxWidth: 230 }}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <RadioGroup row aria-label="sort-by" name="sort-by">
              <FormControlLabel
                value="Mới cập nhật"
                control={<Radio />}
                label="Mới cập nhật"
                sx={{ color: '#333333', '&.Mui-checked': { color: '#FFFFFF' } }}
              />
              <FormControlLabel
                value="Được xem nhiều nhất"
                control={<Radio />}
                label="Được xem nhiều nhất"
                sx={{ color: '#333333', '&.Mui-checked': { color: '#FFFFFF' } }}
              />
            </RadioGroup>
          </Grid>
        </Grid>

        <Grid component={Box} container spacing={5} sx={{ my: 2 }}>
          {data.map((item, index) => (
            <Grid item xs={3} key={index}>
              <StyledLink href={`/create-cv/cv-template`}>
                <SubCard sx={{ borderColor: PRIMARYCOLOR }}>
                  <Stack
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: '10px'
                    }}
                    spacing={1}
                  >
                    <Image
                      width={100}
                      height={100}
                      alt="image"
                      src={'https://static.topcv.vn/v4/image/cv_builder/choose-cv-data/item/case.png'}
                    ></Image>
                    {/* <WorkIcon sx={{ fontSize: 68, color: "#333333" }} /> */}
                    <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                      {item.job}
                    </Typography>
                    <Typography variant="h4" sx={{ fontFamily: 'Roboto, sans-serif', color: '#1E88E5' }}>
                      {item.title}
                    </Typography>
                  </Stack>
                </SubCard>
              </StyledLink>
            </Grid>
          ))}

          <Grid container item xs={12} justifyContent="center" alignItems="center" my={4}>
            <Pagination count={10} variant="text" shape="rounded" color="primary" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
