'use client';

import * as React from 'react';
import { ReactElement } from 'react';


// material-ui
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { yupResolver } from '@hookform/resolvers/yup';
import uniqueId from 'lodash/uniqueId';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as yup from 'yup';

// project imports
import useConfig from 'hooks/useConfig';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Avatar from 'ui-component/extended/Avatar';
import ImageList from 'ui-component/extended/ImageList';
import Comment from './Comment';

// types
import { FormInputProps } from 'types';
import { ThemeMode } from 'types/config';
import { CommentData, CommentType, PostDataType, comments_post } from './interface';

// assets
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import MainCard from 'ui-component/cards/MainCard';

const avatarImage = '/assets/images/users';

const validationSchema = yup.object().shape({
  name: yup.string().required('Comment Field is Required')
});

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
  postCommentAdd: (postId: string, comment: CommentType) => Promise<void>;
  handleCommentLikes: (postId: string, comment: CommentType) => Promise<void>;
  handlePostLikes: (postId: string) => Promise<void>;
  post: PostDataType;
  commentAdd: (postId: string, comment: CommentType, reply: CommentType) => Promise<void>;
}

const Post = ({ commentAdd, handleCommentLikes, handlePostLikes, post, postCommentAdd }: PostProps) => {
  const theme = useTheme();

  const { id, data, profile } = post;

  const { borderRadius } = useConfig();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [commentsResult, setCommentsResult] = React.useState<ReactElement[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

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
  const [openComment, setOpenComment] = React.useState(!(post && post.data.comments > 0));

  //Open chat & show comment
  const handleChangeComment = (id: string) => {
    console.log("Id Post :", id);
    if (post) {
      const commentsFilterById = comments_post.filter((comment) => comment.parentId === id);
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
            commentAdd={commentAdd}
            handleCommentLikes={handleCommentLikes}
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

  const onSubmit = async (comment: CommentData, e: any) => {
    const commentId = uniqueId('#COMMENT_');
    const newComment: CommentType = {
      id: commentId,
      parentId: "",
      profile,
      data: {
        comment: comment.name,
        likes: {
          like: false,
          value: 0
        },
        replies: 0
      }
    };
    postCommentAdd(id, newComment);
    reset({ name: '' });
  };

  return (
    <MainCard boxShadow hover>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container wrap="nowrap" alignItems="center" spacing={1}>
            <Grid item>
              <Avatar alt="User 1" src={`${avatarImage}/${profile.avatar}`} />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="h5">{post?.profile.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} /> {profile.time}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* post - content */}
        <Grid item xs={12} sx={{ '& > p': { ...theme.typography.body1, mb: 0 } }}>
          <Markdown remarkPlugins={[remarkGfm]}>{data.content}</Markdown>
        </Grid>

        {/* post - photo grid */}
        {data && data.images && data.images.length > 0 && (
          <Grid item xs={12}>
            <ImageList itemData={data.images} />
          </Grid>
        )}

        {/* post - video */}
        {data.video && (
          <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 2 } }}>
            <CardMedia
              sx={{ borderRadius: `${borderRadius}px`, height: { xs: 220, lg: 330 } }}
              component="iframe"
              src={`https://www.youtube.com/embed/${data.video}`}
            />
          </Grid>
        )}

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
                <Button
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
                </Button>
                <Button
                  onClick={() => handleChangeComment(post.id)}
                  size="small"
                  variant="text"
                  color="inherit"
                  startIcon={<ChatBubbleTwoToneIcon color="secondary" />}
                >
                  {post ? post.data.comments : 0} comments
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Avatar
                      sx={{ mt: 0.75 }}
                      alt="User 1"
                      src={profile && profile.avatar ? `${avatarImage}/${profile.avatar}` : `${avatarImage}/avatar-1.png`}
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
    </MainCard>

  );
};

export default Post;
