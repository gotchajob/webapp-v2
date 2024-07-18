'use client';

import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

// project imports
import { gridSpacing } from 'store/constant';

// types
import { ThemeMode } from 'types/config';
import { UserProfile } from 'types/user-profile';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import Avatar from 'ui-component/extended/Avatar';
import { ExpertMatching } from 'package/api/expert/match';
import { Box } from '@mui/material';
import { StyledLink } from 'components/common/link/styled-link';
import { CustomerToken } from 'hooks/use-login';
import { useGetCVById } from 'hooks/use-get-cv';
import Image from 'next/image';

const avatarImage = '/assets/images/users';

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

// ==============================|| USER DETAILS CARD ||============================== //

const ExpertBookCard = ({ expert, bookingInfo }: { expert: ExpertMatching, bookingInfo: any }) => {
  const theme = useTheme();

  const formatNation = () => {
    let nation = '';
    expert.nationSupport.forEach((e) => {
      nation = nation + e.nation;
    });
    return nation;
  };

  const { customerToken } = CustomerToken();

  const { cv } = useGetCVById({ id: bookingInfo?.customerCvId }, customerToken);

  useEffect(() => {
    console.log('cv:', cv);
  }, [bookingInfo, customerToken]);

  return (
    <Card
      sx={{
        p: 3,
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
        boxShadow: defaultShadow,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '12px',
        '&:hover': { borderColor: 'primary.main' },
        transition: 'border-color 0.3s'
      }}

    >
      <Grid container spacing={gridSpacing}>
        {cv && (
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Tên cv bạn đã chọn: {cv.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Image
                src="https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg"
                alt="CV Image"
                width={500}
                height={700}
                objectFit="contain"
                style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default ExpertBookCard;
