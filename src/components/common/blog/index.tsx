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
import Comment from '../../Comment';

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
import { GetBlogComment, PostBlogComment } from 'package/api/blog/id/comment';
import { CustomerToken } from 'hooks/use-login';
import Box from '@mui/material/Box';
import { formatDate } from 'package/util';
import { useGetCustomer } from 'hooks/use-get-current-user';
import { accessToken } from 'mapbox-gl';
import { GetUserCurrent, UserProfile } from 'package/api/user/current';
import { enqueueSnackbar } from 'notistack';
import { ca } from 'date-fns/locale';
import { Rating } from '@mui/material';
import { useRouter } from 'next/navigation';


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

  //get customer token
  const { customerToken } = CustomerToken();

  //get customer info
  const { customer } = useGetCustomer(customerToken);

  const [commentsResult, setCommentsResult] = React.useState<ReactElement[]>([]);

  //route
  const route = useRouter();

  //check length comment > 0
  const [openComment, setOpenComment] = React.useState(!(blog && 5 > 0));

  //Set UserProfile
  const [user, setUser] = React.useState<UserProfile | null>();

  //rating state
  const [ratingValue, setRatingValue] = React.useState<number | null>(0);

  //Get User Profile by token
  const getCustomer = async () => {
    if (customerToken) {
      try {
        const res = await GetUserCurrent(customerToken);
        setUser(res.data);
      } catch (error: any) {
        enqueueSnackbar("Có lỗi khi lấy thông tin từ tài khoản của bạn", {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          }
        });
      }
    };
  }

  //handle rating change
  const handleRating = (event: React.SyntheticEvent, value: number | null) => {
    try {
      setRatingValue(value);
      console.log("rating:", value);
      enqueueSnackbar("Đánh giá bài viết thành công", {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        }
      });
      //refresh
      route.refresh();
    } catch (error: any) {
      enqueueSnackbar("Có lỗi xảy ra khi đánh giá bài viết", {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        }
      });
    }
  }

  //Open chat & show comment
  const handleChangeComment = async (id: number) => {
    if (blog) {
      getCustomer();
      const blogComments = await GetBlogComment({ id, pageNumber: 1, pageSize: 10 }, customerToken);
      if (blogComments.data.list.length > 0) {
        const comments = blogComments.data.list.map((comment, index) => (
          <Comment
            comment={comment}
            key={index}
            blogId={id}
            user={comment.profile}
            level={0}
            commentAdd={commentAdd}
            handleCommentLikes={handleCommentLikes}
          />
        ));
        //refresh
        route.refresh();
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

  const onSubmit = async (content: any, e: any) => {
    if (!customerToken) {
      enqueueSnackbar("Bạn cần đăng nhập để bình luận", {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        }
      })
      reset({ name: '' });
      return;
    }
    try {
      const comment_content = content.name;
      const data = await PostBlogComment({ id: blog.id }, { content: comment_content }, customerToken);
      enqueueSnackbar("Bình luận của bạn đã được đăng", {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        }
      });
      //refresh
      route.refresh();
    } catch (error: any) {
      enqueueSnackbar("Có lỗi xảy ra khi đăng bình luận", {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        }
      });
    } finally {
      reset({ name: '' });
    }
  };

  React.useEffect(() => {
    console.log("blog : ", blog);
  }, [])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container wrap="nowrap" alignItems="center" spacing={1}>
          <Grid item>
            <Avatar alt="User 1" src={`${blog?.profile.avatar}`} />
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
              <Grid item xs>
                <Grid container direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
                  <Grid item>
                    <Rating value={blog.averageRating} size="small" readOnly />
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Typography variant="h5">({blog.ratingQuantity ? blog.ratingQuantity : 0}) Lượt đánh giá</Typography>
                    </Grid>
                  </Grid>
                </Grid>
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
                {blog && blog.numberComment ? blog.numberComment : 0} comments
              </Button>
            </Stack>
          </Grid>
          <Grid item xs>
            <Grid container direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
              {customerToken && (
                <>
                  <Grid item>
                    <Typography variant="h5">Đánh giá:</Typography>
                  </Grid>
                  <Grid item>
                    <Rating value={ratingValue} size="small" onChange={(e, v) => { handleRating(e, v) }} />
                  </Grid>
                </>
              )}
              <Grid item>
                <IconButton onClick={() => { }} size="large" aria-label="more options">
                  <ShareTwoToneIcon sx={{ width: '16px', height: '16px' }} />
                </IconButton>
              </Grid>
            </Grid>
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
                    src={user && user.avatar ? `${user.avatar}` : ``}
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
                    <Button type="submit" variant="contained" color="info" size={downMD ? 'small' : 'large'} sx={{ mt: 0.5 }} onClick={() => route.refresh()}>
                      Comment
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        )
        }
      </Collapse >

      {commentsResult && commentsResult}
    </Grid >
  );
};

export default BlogDetail;
