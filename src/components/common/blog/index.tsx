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
import { BlogDetailData } from 'package/api/blog/id';
import { GetBlogComment } from 'package/api/comment';
import { CustomerToken } from 'hooks/use-login';
import Box from '@mui/material/Box';
import { formatDate } from 'package/util';
import { useGetCustomer } from 'hooks/use-get-current-user';

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

export interface BlogProps {
  blogCommentAdd: (id: number, comment: CommentType) => Promise<void>;
  handleCommentLikes: (id: number, comment: CommentType) => Promise<void>;
  handleBlogLikes: (id: number) => Promise<void>;
  blog: BlogDetailData;
  commentAdd: (id: number, comment: CommentType, reply: CommentType) => Promise<void>;
}

const BlogDetail = ({ commentAdd, handleCommentLikes, handleBlogLikes, blog, blogCommentAdd }: BlogProps) => {
  const theme = useTheme();

  
  const downMD = useMediaQuery(theme.breakpoints.down('md'));
  const [commentsResult, setCommentsResult] = React.useState<ReactElement[]>([]);
  
  const { customer } = useGetCustomer();

  const { customerToken } = CustomerToken();

  //check length comment > 0
  const [openComment, setOpenComment] = React.useState(!(blog && 5 > 0));

  //Open chat & show comment
  const handleChangeComment = async (id: number) => {
    if (blog) {
      const blogComments = await GetBlogComment({ id, pageNumber: 1, pageSize: 10 }, customerToken);
      if (blogComments.data.list.length > 0) {
        const comments = blogComments.data.list.map((comment, index) => (
          <Comment
            comment={comment}
            key={index}
            blogId={blog.id}
            user={comment.profile}
            level={0}
            commentAdd={commentAdd}
            handleCommentLikes={handleCommentLikes}
          />
        ));
        setCommentsResult(comments);
      } else {
        setCommentsResult([]);
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
    reset({ name: '' });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container wrap="nowrap" alignItems="center" spacing={1}>
          <Grid item>
            <Avatar alt="User 1" src={`${avatarImage}/${blog.profile.avatar}`} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="h5">{blog.profile.fullName}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} />{' '}
                  {formatDate(blog.createdAt, 'dd/MM/yyyy')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* post - content */}
      <Grid item xs={12} sx={{ '& > p': { ...theme.typography.body1, mb: 0 } }}>
        <div
          dangerouslySetInnerHTML={{
            __html: blog.content
          }}
        ></div>
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
              <Button
                variant="text"
                onClick={() => handleBlogLikes(blog.id)}
                color="inherit"
                size="small"
                startIcon={<ThumbUpAltTwoToneIcon color={blog && blog.likes && blog.likes.liked ? 'primary' : 'inherit'} />}
              >
                {blog && blog.likes && blog.likes.value ? blog.likes.value : 0} likes
              </Button>
              <Button
                onClick={() => handleChangeComment(blog.id)}
                size="small"
                variant="text"
                color="inherit"
                startIcon={<ChatBubbleTwoToneIcon color="secondary" />}
              >
                {blog && blog?.comments ? blog.comments : 0} comments
              </Button>
            </Stack>
          </Grid>
          <Grid item>
            <IconButton onClick={() => {}} size="large" aria-label="more options">
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
                    src={customer && customer.avatar ? `${customer.avatar}` : `${avatarImage}/avatar-1.png`}
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
  );
};

export default BlogDetail;
