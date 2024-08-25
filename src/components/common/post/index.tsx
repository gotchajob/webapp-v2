'use client';

import * as React from 'react';
import { ReactElement } from 'react';


// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { yupResolver } from '@hookform/resolvers/yup';
import uniqueId from 'lodash/uniqueId';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as yup from 'yup';
import useConfig from 'hooks/useConfig';
import Avatar from 'ui-component/extended/Avatar';

import ImageList from 'ui-component/extended/ImageList';
import Comment from './comment';

// types
import { FormInputProps } from 'types';
import { ThemeMode } from 'types/config';
import { CommentData, CommentType, PostDataType } from './interface';

// assets
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, Button, Collapse, IconButton, Stack } from '@mui/material';
import { useGetCustomer } from 'hooks/use-get-current-user';
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
import { CustomerToken } from 'hooks/use-login';
import { useGetCustomer } from 'hooks/use-get-current-user';
import { FlexBox } from '../box/flex-box';
import { Text } from '../text/text';
import { DialogActions } from '@mui/material';

const avatarImage = '/assets/images/users';

// ==============================|| COMMENT TEXTFIELD ||============================== //

// ==============================|| SOCIAL PROFILE - POST ||============================== //


  postCommentAdd: (postId: number, comment: CommentType) => Promise<void>;
  handleCommentLikes: (postId: number, comment: CommentType) => Promise<void>;
  handlePostLikes: (postId: number) => Promise<void>;
  post: PostDataType;
  showAddFeedback?: boolean;
  showTotalFeedback?: boolean;
}

const Post = ({ handleCommentLikes, handlePostLikes, post, postCommentAdd, showAddFeedback, showTotalFeedback }: PostProps) => {
  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const accessToken = CustomerToken();

  const { customer } = useGetCustomer(accessToken.customerToken);


  const RenderAddComment = (
    <Stack spacing={2} sx={{pt: 5}}>
      {customer && (
        <FlexBox>
          <Avatar src={customer?.avatar} alt="" size='sm'/>
          <Text ml={2} variant='h4'>{customer.fullName}</Text>
        </FlexBox>
      )}
      <Rating defaultValue={0} />
      <TextField label="Thêm đánh giá" multiline minRows={3}/>
      <DialogActions>
        <Button variant='outlined'>Gửi</Button>
      </DialogActions>
    </Stack>
  );

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

        {/* post - content */}
        <Grid item xs={12} sx={{ '& > p': { ...theme.typography.body1, mb: 0 } }}>
          <Markdown remarkPlugins={[remarkGfm]}>{post.caption}</Markdown>
        </Grid>

        {/* post - photo grid */}

        {post && (
          <Grid item xs={12}>
            <ImageCard src={post.cvImage} />
          </Grid>


        {/* post - comment, likes and replay history */}
        <Grid item xs={12}>
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
        </Grid>

        {CommentData.data.list.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
        <Grid item xs={12}>
          {RenderAddComment}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Post;
