'use client';

import { useState } from 'react';

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

const avatarImage = '/assets/images/users';

// ==============================|| USER DETAILS CARD ||============================== //

const ExpertDetailCard = ({ about, avatar, contact, email, location, name, role }: UserProfile) => {
  const theme = useTheme();

  const avatarProfile = avatar && `${avatarImage}/${avatar}`;

  const [value, setValue] = useState<number | null>(4);

  return (
    <Card
      sx={{
        p: 2,
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': { borderColor: 'primary.main' }
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            alt={name}
            src={avatarProfile}
            sx={{
              width: theme.spacing(15),
              height: theme.spacing(15)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">{name}</Typography>
          <Typography variant="caption">{role}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: 'grey.700' }}>
            {about}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption">Email</Typography>
          <Typography variant="h6">{email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="caption">Liên lạc</Typography>
              <Typography variant="h6">{contact}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Quốc gia</Typography>
              <Typography variant="h6">{location}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Rating name="read-only" value={value} readOnly size='small' sx={{ pt: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth startIcon={<ChatBubbleTwoToneIcon />}>
                Book
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ExpertDetailCard;
