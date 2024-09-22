'use client';

import * as React from 'react';
import { ReactElement } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import Avatar from 'ui-component/extended/Avatar';
import Comment from '../../Comment';

// types
import { FormInputProps } from 'types';
import { ThemeMode } from 'types/config';
import { CommentType } from './interface';

// assets
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import { Rating } from '@mui/material';
import { useGetCustomer } from 'hooks/use-get-current-user';
import { useGetSearchParams, useSearchParamsNavigation } from 'hooks/use-get-params';
import { CustomerToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import { enqueueSnackbar } from 'notistack';
import { PatchBlogReaction } from 'package/api/blog-reaction';
import { BlogDetailData, getBlogDetail } from 'package/api/blog/id';
import { GetBlogComment, PostBlogComment } from 'package/api/blog/id/comment';
import { formatDate } from 'package/util';
import useSnackbarDialog from '../snackbar-dialog/snackbar-dialog';
import { useRouter } from 'next/navigation';

const avatarImage = '/assets/images/users';

const validationSchema = yup.object().shape({
  name: yup.string().required('Comment Field is Required')
});

// ==============================|| COMMENT TEXTFIELD ||============================== //

const FormInput = ({ bug, label, size, fullWidth = true, name, required, ...others }: FormInputProps) => {
  const { control } = useFormContext();

  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();

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
  refreshBlog: any;
}

const BlogDetail = ({ commentAdd, handleCommentLikes, refreshBlog, handleBlogLikes, blog, blogCommentAdd }: BlogProps) => {
  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  //hook refresh
  const { refreshTime, refresh: refreshComment } = useRefresh();

  //get customer token
  const { customerToken } = CustomerToken();

  //get profile customer
  const { customer } = useGetCustomer(customerToken);

  //set state comments
  const [commentsResult, setCommentsResult] = React.useState<ReactElement[]>([]);

  //rating state
  const [rated, setRated] = React.useState<number | undefined>(blog.rated);

  //avgRate state
  const [avgRate, setAvgRate] = React.useState<number | undefined>(blog.averageRating);

  //quantityRate state
  const [quantityRate, setQuantityRate] = React.useState<number | undefined>(blog.ratingQuantity);

  //check length comment > 0s
  const [openComment, setOpenComment] = React.useState(!(blog && 5 > 0));

  //Open chat & show comment
  const handleChangeComment = async () => {
    refreshComment();
    setOpenComment((prev) => !prev);
  };

  //handle refresh after comment
  React.useEffect(() => {
    const refreshBlogComment = async () => {
      const blogComments = await GetBlogComment({ id: blog.id, pageNumber: 1, pageSize: 10 }, customerToken);
      if (blogComments.data.list.length > 0) {
        const comments = blogComments.data.list.map((comment, index) => (
          <Comment
            level={0}
            blogId={blog.id}
            comment={comment}
            key={index}
            refreshComment={refreshComment}
            user={comment.profile}
            commentAdd={commentAdd}
            handleCommentLikes={handleCommentLikes}
          />
        ));
        setCommentsResult(comments);
      } else {
        setCommentsResult([]);
      }
    };
    refreshBlogComment();
  }, [refreshTime]);

  //handle like change
  const handleLike = async () => {
    try {
      if (customerToken === null) {
        throw new Error('Phải đăng nhập');
      }
      const like = await PatchBlogReaction(
        {
          blogId: blog.id,
          reactionId: blog.likes.liked ? undefined : 1,
          rating: null
        },
        customerToken
      );
      if (like.status == 'error') {
        throw new Error(like.responseText);
      }
      refreshBlog();
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      });
    }
  };

  //handle rating change
  const handleRating = async (event: any, value: number | null) => {
    try {
      if (customerToken === null) {
        throw new Error('Phải đăng nhập');
      }
      const rating = await PatchBlogReaction(
        {
          blogId: blog.id,
          rating: value ? value : 0,
          reactionId: null
        },
        customerToken
      );
      if (rating.status == 'error') {
        throw new Error(rating.responseText);
      }
      enqueueSnackbar('Đánh giá bài viết thành công', {
        variant: 'success'
      });
    } catch (error: any) {
      enqueueSnackbar('Có lỗi xảy ra khi đánh giá bài viết', {
        variant: 'error'
      });
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
      throw new Error();
    }
    try {
      const comment_content = content.name;
      const data = await PostBlogComment({ id: blog.id }, { content: comment_content }, customerToken);
      refreshComment();
      enqueueSnackbar('Bình luận của bạn đã được đăng', {
        variant: 'success'
      });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      reset({ name: '' });
    }
  };

  // React.useEffect(() => {
  //   console.log("blog:", blog);
  //   getClientBlog();
  // }, [customerToken])

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
                    <Rating value={avgRate} size="small" readOnly />
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Typography variant="h5">({blog ? quantityRate : 0}) Lượt đánh giá</Typography>
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
                onClick={handleLike}
                color="inherit"
                size="small"
                startIcon={<ThumbUpAltTwoToneIcon color={blog && blog.likes.liked ? 'primary' : 'inherit'} />}
              >
                {blog ? blog.likes.value : 0} likes
              </Button>
              <Button
                onClick={handleChangeComment}
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
                    <Rating value={rated ? rated : blog.rated} size="small" onChange={handleRating} />
                  </Grid>
                </>
              )}
              <Grid item>
                <IconButton onClick={() => {}} size="large" aria-label="more options">
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
                  <Avatar sx={{ mt: 0.75 }} alt="User 1" src={customer && customer.avatar ? `${customer.avatar}` : ``} size="xs" />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <FormProvider {...methods}>
                    <FormInput fullWidth name="name" label="Write a comment..." size={downMD ? 'small' : 'medium'} bug={errors} />
                  </FormProvider>
                </Grid>
                <Grid item>
                  <AnimateButton>
                    <Button type="submit" variant="contained" color="info" size={downMD ? 'small' : 'large'} sx={{ mt: 0.5 }}>
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
