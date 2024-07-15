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

const avatarImage = '/assets/images/users';

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

// ==============================|| USER DETAILS CARD ||============================== //

const ExpertDetailCard = ({ expert }: { expert: ExpertMatching }) => {
  const theme = useTheme();

  const formatNation = () => {
    let nation: string[] = [];
    expert.nationSupport.forEach((e) => {
      nation.push(e.nation);
    });
    return nation.join(', ');
  };

  useEffect(() => { console.log("expert:", expert) }, [expert]);

  return (
    <Card
      sx={{
        p: 2,
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
        boxShadow: defaultShadow,
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': { borderColor: 'primary.main' }
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            alt={'avatar'}
            src={expert.avatar}
            sx={{
              width: theme.spacing(15),
              height: theme.spacing(15)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">{expert.fullName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" sx={{ color: 'grey.700' }}>
            Bio
          </Typography>
          <Box sx={{ height: 65, overflow: 'auto' }}>
            <Typography variant="h6" sx={{ color: 'grey.700' }}>
              {expert?.bio || ''}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="caption">Quốc gia hỗ trợ</Typography>
              <Typography variant="h6">{formatNation()}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <StyledLink href={`/share-cv/expert-profile/${expert.userId}`}>
                <Button variant="outlined" fullWidth startIcon={<ChatBubbleTwoToneIcon />}>
                  Book
                </Button>
              </StyledLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card >
  );
};

export default ExpertDetailCard;
