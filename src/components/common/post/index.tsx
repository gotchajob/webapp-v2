'use client';

import * as React from 'react';
import { ReactElement } from 'react';
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
import Comment from './Comment';
import { FormInputProps } from 'types';
import { comments_post } from './interface';
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
import { formatDate } from 'package/util';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import { ThemeMode } from 'types/config';

const avatarImage = '/assets/images/users';

const validationSchema = yup.object().shape({
  name: yup.string().required('Comment Field is Required')
});

export interface CommentData {
  comment: string;
  likes: {
    like: boolean;
    value: number;
  };
  replies: number;
}

export interface CommentType extends UserProfile {
  parentId: string;
  data?: CommentData;
}

// ==============================|| COMMENT TEXTFIELD ||============================== //

const FormInput = ({ bug, label, size, fullWidth = true, name, required, ...others }: FormInputProps) => {
  let isError = false;
  let errorMessage = '';

  if (bug && Object.prototype.hasOwnProperty.call(bug, name)) {
    isError = true;
    errorMessage = bug[name].message;
  }

  return (
    <>
      <Controller
        name={name}
        defaultValue=""
        render={({ field }) => (
          <TextField
            fullWidth={fullWidth}
            size={size}
            label={label}
            InputLabelProps={{
              className: required ? 'required-label' : '',
              required: required || false
            }}
            error={isError}
            {...field}
          />
        )}
        {...others}
      />
      {errorMessage && (
        <Grid item xs={12}>
          <FormHelperText error>{errorMessage}</FormHelperText>
        </Grid>
      )}
    </>
  );
};

// ==============================|| SOCIAL PROFILE - POST ||============================== //

export interface PostProps {
  post: CVs;
}

const Post = ({ post }: PostProps) => {
  const theme = useTheme();

  const { refresh, refreshTime } = useRefresh();

  const { customerToken } = CustomerToken();

  const { borderRadius } = useConfig();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [commentsResult, setCommentsResult] = React.useState<ReactElement[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const { cvShareComment, loading: cvShareCommentLoading } = useGetCVShareComment({ cvShareId: post.id, pageNumber: 1, pageSize: 6 }, customerToken, refreshTime)

  const { customer } = useGetCustomer(customerToken);

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorSharedEl, setAnchorSharedEl] = React.useState<Element | null>(null);
  const handleSharedClick = (event: React.MouseEvent) => {
    setAnchorSharedEl(event.currentTarget);
  };

  const handleSharedClose = () => {
    setAnchorSharedEl(null);
  };

  //check length comment > 0
  const [openComment, setOpenComment] = React.useState(!(cvShareComment && cvShareComment.list.length > 0));

  //Open chat & show comment
  const handleChangeComment = (id: number) => {
    console.log("Id Post :", id);
    if (post) {
      const commentsFilterById = comments_post.filter((comment) => +comment.parentId === id);
      console.log("filterd: ", commentsFilterById);
      if (commentsFilterById.length > 0) {
        const comments = commentsFilterById.map((comment, index) => (
          <Comment
            comment={comment}
            key={index}
            postId={comment.id}
            parentId={comment.parentId}
            user={comment.profile}
            level={0}
            commentAdd={() => { }}
            handleCommentLikes={() => { }}
          />
        ));
        setCommentsResult(comments);
      }
      else {
        setCommentsResult([])
      }
      setOpenComment((prev) => !prev);
    }
  };

  const methods = useForm({
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  return (
    <MainCard boxShadow hover>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container wrap="nowrap" alignItems="center" spacing={1}>
            <Grid item>
              {/* <Avatar alt="User 1" src={`${avatarImage}/${post.}`} /> Lỗi 1 */}
              <Avatar alt="User 1" src={`${avatarImage}/${"avatar-3.png"}`} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  {/* <Typography variant="h5">{post?.profile.name}</Typography> Lỗi 2 */}
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} /> {formatDate(post.createdAt, "dd/MM/yyyy - hh:mm")}
                  </Typography>
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
        {post && post.cvImage && (
          // <Grid item xs={12}>
          //   <ImageList itemData={[post.cvImage]} />
          // </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: 'center',
                mt: 2,
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #ddd",
              }}
            >
              <Image
                src={post.cvImage}
                alt={"cv-image"}
                width={595}
                height={842}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
        )}

        {/* post - video */}
        {/* {data.video && (
          <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 2 } }}>
            <CardMedia
              sx={{ borderRadius: `${borderRadius}px`, height: { xs: 220, lg: 330 } }}
              component="iframe"
              src={`https://www.youtube.com/embed/${data.video}`}
            />
          </Grid>
        )} */}

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
                {/* <Button
                  variant="text"
                  onClick={() => handlePostLikes(id)}
                  color="inherit"
                  size="small"
                  startIcon={<ThumbUpAltTwoToneIcon color={data && data.likes && data.likes.like ? 'primary' : 'inherit'} />}
                >
                  {data && data.likes && data.likes.value ? data.likes.value : 0}
                  <Typography color="inherit" sx={{ fontWeight: 500, ml: 0.5, display: { xs: 'none', sm: 'block' } }}>
                    likes
                  </Typography>
                </Button> */}
                <Button
                  onClick={() => handleChangeComment(post.id)}
                  size="small"
                  variant="text"
                  color="inherit"
                  startIcon={<ChatBubbleTwoToneIcon color="secondary" />}
                >
                  {cvShareComment ? cvShareComment.list.length : 0} comments
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <IconButton onClick={handleSharedClick} size="large" aria-label="more options">
                <ShareTwoToneIcon sx={{ width: '16px', height: '16px' }} />
              </IconButton>

            </Grid>
          </Grid>
        </Grid>

        {/* add new comment */}
        <Collapse in={openComment} sx={{ width: '100%' }}>
          {openComment && (
            <Grid item xs={12} sx={{ pt: 2 }}>
              <form onSubmit={handleSubmit(() => { })}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Avatar
                      sx={{ mt: 0.75 }}
                      alt="User 1"
                      // src={post && post.avatar ? `${avatarImage}/${profile.avatar}` : `${avatarImage}/avatar-1.png`}
                      src={`${avatarImage}/avatar-1.png`}
                      size="xs"
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <FormProvider {...methods}>
                      <FormInput fullWidth name="name" label="Write a comment..." size={downMD ? 'small' : 'medium'} bug={errors} />
                    </FormProvider>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button type="submit" variant="contained" color="secondary" size={downMD ? 'small' : 'large'} sx={{ mt: 0.5 }}>
                        Comment
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          )}
        </Collapse>

        {commentsResult && commentsResult}

      </Grid>
    </MainCard >

  );
};

export default Post;
