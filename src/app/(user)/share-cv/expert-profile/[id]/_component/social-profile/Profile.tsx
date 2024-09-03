'use client';

import React from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import Posts from 'ui-component/cards/Post';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { dispatch, useSelector } from 'store';
import { getPosts, editComment, addComment, addReply, likePost, likeComment, likeReply } from 'store/slices/user';

// types
import { ThemeMode } from 'types/config';
import { PostDataType, Reply } from 'types/user-profile';

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import { Expert } from 'package/api/expert/id';
import { TableContainer, Table, TableBody, TableRow, TableCell, Rating } from '@mui/material';
import { formatDate } from 'package/util';
import SubCard from 'ui-component/cards/SubCard';
import { EducationData } from '../../page';
import { useGetExpertSkillOptions } from 'hooks/use-get-expert-skill-option';
import { FlexBetween } from 'components/common/box/flex-box';
import { Text } from 'components/common/text/text';

// ==============================|| SOCIAL PROFILE - POST ||============================== //

const Profile = ({ expert }: { expert: Expert }) => {
  const theme = useTheme();

  const { expertSkillOptions } = useGetExpertSkillOptions({ expertId: expert.expertId });

  const sideAvatarSX = {
    borderRadius: '8px',
    width: 48,
    height: 48,
    fontSize: '1.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: theme.palette.mode === ThemeMode.DARK ? '1px solid' : 'none',
    '&>svg': {
      width: 24,
      height: 24
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={4}>
        <MainCard>
          <Grid container alignItems="center" spacing={gridSpacing}>
            <Grid item>
              <Box
                sx={{
                  ...sideAvatarSX,
                  bgcolor: alpha(theme.palette.primary.dark, 0.1),
                  border: theme.palette.mode === ThemeMode.DARK ? '1px solid' : 'none',
                  borderColor: 'primary.main',
                  color: 'primary.dark'
                }}
              >
                <PeopleAltTwoToneIcon />
              </Box>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography variant="h3" color="primary" sx={{ mb: 0.625 }}>
                239k
              </Typography>
              <Typography variant="body2">Lượt booking</Typography>
            </Grid>
            <Grid item>
              <IconButton size="large" aria-label="navigation icon">
                <NavigateNextRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider sx={{ margin: '16px 0' }} />
          <Grid container alignItems="center" spacing={gridSpacing}>
            <Grid item>
              <Box
                sx={{
                  ...sideAvatarSX,
                  bgcolor: alpha(theme.palette.secondary.dark, 0.1),
                  borderColor: 'secondary.main',
                  color: 'secondary.dark'
                }}
              >
                <RecentActorsTwoToneIcon />
              </Box>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography
                variant="h3"
                sx={{
                  mb: 0.625,
                  color: theme.palette.mode === ThemeMode.DARK ? 'text.secondary' : 'secondary.main'
                }}
              >
                234k
              </Typography>
              <Typography variant="body2">Lượt đánh giá tốt</Typography>
            </Grid>
            <Grid item>
              <IconButton size="large" aria-label="navigation icon">
                <NavigateNextRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={8}>
        <MainCard>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Giới thiệu</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">{expert.bio}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ margin: '16px 0' }} />
          <Grid
            container
            spacing={2}
            sx={{
              '& >div': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
                width: '100%'
              },
              '& a': {
                color: 'grey.700',

                '& svg': {
                  mr: 1,
                  verticalAlign: 'bottom'
                },
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'none'
                }
              }
            }}
          >
            <Grid item xs={12}>
              <Link href="https://www.instagram.com/codedthemes" target="_blank" underline="hover">
                <InstagramIcon sx={{ color: 'orange.dark' }} />
                {expert.twitterUrl}
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="https://www.facebook.com/codedthemes" target="_blank" underline="hover">
                <FacebookIcon color="primary" />
                {expert.facebookUrl}
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="https://in.linkedin.com/company/codedthemes" target="_blank" underline="hover">
                <LinkedInIcon sx={{ color: 'grey.900' }} />
                {expert.linkedinUrl}
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Link href="https://in.linkedin.com/company/codedthemes" target="_blank" underline="hover">
                <MailOutlineIcon sx={{ color: 'grey.900' }} />
                {expert.email}
              </Link>
            </Grid>
            {/* <Grid item xs={12}>
              <Link href="https://in.linkedin.com/company/codedthemes" target="_blank" underline="hover">
                <LinkedInIcon sx={{ color: 'grey.900' }} />
                {expert.phone}
              </Link>
            </Grid> */}
          </Grid>
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <SubCard title="Thời gian">
          <Grid container spacing={1}>
            {expert.education !== undefined &&
              JSON.parse(expert.education).map((row: EducationData, index: number) => (
                <Grid item xs={12} key={index}>
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="subtitle1">{row.time}</Typography>
                      <Typography variant="subtitle2">{row.timeDes}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="subtitle1">{row.title}</Typography>
                      <Typography variant="subtitle2">{row.titleDes}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </SubCard>
      </Grid>
      {expertSkillOptions?.map((skillOptions, index) => (
        <>
          <Grid item xs={4}>
            <SubCard title={skillOptions.skillOptionName} key={index}>
              <FlexBetween>
                <Rating value={skillOptions.sumPoint} size="small" readOnly />
                <Text fontSize={13}>
                  <span style={{ fontWeight: 'bold' }}>{skillOptions.totalRating}</span> lượt đánh giá
                </Text>
              </FlexBetween>
            </SubCard>
          </Grid>
        </>
      ))}
    </Grid>
  );
};

export default Profile;
