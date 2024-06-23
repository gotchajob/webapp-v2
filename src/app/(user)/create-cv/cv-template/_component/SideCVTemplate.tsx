import React, { useState } from 'react';
import { Box, Grid, Typography, Stack } from '@mui/material';
import Image from 'next/image';

const data = [
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/prosper.png', title: 'Thành Đạt' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/ambitious.png', title: 'Tham Vọng' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/senior_v2.png', title: 'Senior' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/elegant.png', title: 'Thanh Lịch' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/passion.png', title: 'Đam mê' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/elegant.png', title: 'Chuyên gia' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/formal.png', title: 'Trang Trọng' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/time.png', title: 'Thời Đại' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/minimalism.png', title: 'Tối Giản' },
  { img: 'https://www.topcv.vn/images/cv/screenshots/thumbs/cv-template-thumbnails-v1.2/default_v2.png', title: 'Tiêu Chuẩn' }
];

const SideCVTemplate = ({ onChangeTemplate }: { onChangeTemplate?: (template: { img: string; title: string }) => void }) => {
  const handleChangeTemplate = (index: number) => {
    const newTemplate = data[index];
    if (onChangeTemplate) {
      onChangeTemplate(newTemplate);
    }
  };

  return (
    <Grid container spacing={1}>
      {data.map((template, index) => (
        <Grid item xs={6} key={index} onClick={() => handleChangeTemplate(index)}>
          <Stack
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{
              mb: 2,
              borderRadius: 1,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <Box>
              <Image
                src={template.img}
                alt={template.title}
                width={95}
                height={95}
                style={{
                  borderRadius: 5,
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </Box>
            <Typography fontSize={16} align="center">
              {template.title}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

export default SideCVTemplate;
