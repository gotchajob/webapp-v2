'use client';

import * as React from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from 'ui-component/extended/Avatar';

import ImageList from 'ui-component/extended/ImageList';

// types
import { FormInputProps } from 'types';
import { ThemeMode } from 'types/config';
import { CommentData, CommentType, PostDataType } from './interface';

// assets
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Button, IconButton, Stack } from '@mui/material';
import { useGetCVShareComment } from 'hooks/use-get-cv-share-comment';
import { CustomerToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import Image from 'next/image';
import { CVs } from 'package/api/cv-share';
import { UserProfile } from 'package/api/user/current';
import MainCard from 'ui-component/cards/MainCard';
import Rating from '@mui/material/Rating';
import { ImageCard } from '../image/image-card';
import { formatDate } from 'package/util';
import { useGetCustomer } from 'hooks/use-get-current-user';
import { FlexBox, FlexCenter } from '../box/flex-box';
import { Text } from '../text/text';
import { DialogActions } from '@mui/material';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import Comment from './comment';
import { CustomerReview, RatingParams } from 'components/review';
const avatarImage = '/assets/images/users';

// ==============================|| COMMENT TEXTFIELD ||============================== //

// ==============================|| SOCIAL PROFILE - POST ||============================== //

export interface PostProps {
  post: PostDataType;
  showAddFeedback?: boolean;
  showTotalFeedback?: boolean;
}

const Post = ({ post, showAddFeedback, showTotalFeedback }: PostProps) => {
  // The theme and media query hooks are not being used in the current code
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const accessToken = CustomerToken();
  const { customer } = useGetCustomer(accessToken.customerToken);

  const ratingParams = React.useMemo(() => {
    const newRatingParams: RatingParams = {
      feedbackList: [],
      totalRatingList: [
        { rating: 5, count: 0 },
        { rating: 4, count: 0 },
        { rating: 3, count: 0 },
        { rating: 2, count: 0 },
        { rating: 1, count: 0 }
      ]
    };

    post.rating.forEach((value) => {
      const index = newRatingParams.totalRatingList.findIndex((e) => e.rating === value.rating);
      newRatingParams.totalRatingList[index].count = newRatingParams.totalRatingList[index].count + value.count;
    });
    return newRatingParams;
  }, [post]);

  const RenderAddComment = (
    <Stack spacing={2} sx={{ pt: 5 }}>
      {customer && (
        <FlexBox>
          <Avatar src={customer?.avatar} alt="" size="sm" />
          <Text ml={2} variant="h4">
            {customer.fullName}
          </Text>
        </FlexBox>
      )}
      <Rating defaultValue={0} />
      <TextField label="Thêm đánh giá" multiline minRows={3} />
      <DialogActions>
        <Button variant="outlined">Gửi</Button>
      </DialogActions>
    </Stack>
  );

  const renderFeedback = (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{ mt: 0, color: theme.palette.mode === ThemeMode.DARK ? 'grey.700' : 'grey.800' }}
    >
      <Grid item>
        <Stack direction="row" spacing={2}>
          <Rating readOnly value={post.rating[0].rating} precision={0.5} />
          <Button size="small" variant="text" color="inherit" startIcon={<ChatBubbleTwoToneIcon color="secondary" />}>
            {post ? post.rating[0].count : 0} comments
          </Button>
        </Stack>
      </Grid>
      <Grid item>
        <IconButton size="large" aria-label="more options">
          <ShareTwoToneIcon sx={{ width: '16px', height: '16px' }} />
        </IconButton>
      </Grid>
    </Grid>
  );

  const renderTotalFeedback = <CustomerReview ratingParams={ratingParams} />;
  return (
    <MainCard boxShadow hover>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container wrap="nowrap" alignItems="center" spacing={1}>
            <Grid item>
              <Avatar alt="User 1" src={`${avatarImage}/${post.userInfo.avatar}`} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container alignItems="center" spacing={1} justifyContent={'space-between'}>
                <Grid item>
                  <Typography variant="h5">{post.userInfo.fullName}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">{formatDate(post.createdAt, 'dd/MM/yyyy')}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* This section is for rendering the post content as markdown, currently commented out */}
        {/* <Grid item xs={12} sx={{ '& > p': { ...theme.typography.body1, mb: 0 } }}>
          <Markdown remarkPlugins={[remarkGfm]}>{post.caption}</Markdown>
        </Grid> */}

        {/* The photo grid section is also commented out */}
        {post && (
          <Grid item xs={12}>
            <FlexCenter>
              <ImageCard src={post.cvImage} width={700 / 1.414} height={700} />
            </FlexCenter>
          </Grid>
        )}
        {/* {/* post - comment, likes and replay history */}
        <Grid item xs={12}>
          {showTotalFeedback ? renderTotalFeedback : renderFeedback}
        </Grid>
        {CommentData.data.list.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
        <Grid item xs={12}>
          {showAddFeedback && RenderAddComment}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Post;
