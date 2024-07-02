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
import { CVCategory, CVCategoryResponse, GetCVCategory } from 'package/api/cv-category';
import { useEffect, useState } from 'react';
import { CVTemplateData } from 'components/cv-component/interface';

const url = 'https://d3vpszern3jgjo.cloudfront.net/wp-content/uploads/2021/08/resume-reading-768x432.png';

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

  // const CVCategory: CVCategoryResponse = use(GetCVCategory({}));

  const [CVCategory, setCVCategory] = useState<CVCategory[]>();

  const fetchCVCategory = async () => {
    const data = await GetCVCategory({});
    setCVCategory(data.data);
  }

  useEffect(() => {
    fetchCVCategory();
  }, [])

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
          {CVCategory &&
            CVCategory.map((item, index) => (
              <Grid item xs={3} key={index}>
                <StyledLink href={`/create-cv/cv-template/${item.id}`}>
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
                        {item.description}
                      </Typography>
                      <Typography variant="h4" sx={{ fontFamily: 'Roboto, sans-serif', color: '#1E88E5' }}>
                        {item.name}
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


