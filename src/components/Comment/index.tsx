'use client';

import { ReactElement, useEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
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

// assets
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';

const avatarImage = '/assets/images/users';
// types
import { useGetCustomer } from 'hooks/use-get-current-user';
import { CustomerToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import { enqueueSnackbar } from 'notistack';
import { CommentList, GetReplyComment, PostBlogComment, Profile } from 'package/api/blog/id/comment';
import { PatchCommentReaction } from 'package/api/comment-reaction';
import { formatDate } from 'package/util';
import { FormInputProps } from 'types';
import { ThemeMode } from 'types/config';

const validationSchema = yup.object().shape({
  name: yup.string().required('Reply Field is Required')
});

// ==============================|| COMMENT TEXTFIELD ||============================== //

const FormInput = ({ bug, label, name, required, ...others }: FormInputProps) => {
  const { control } = useFormContext();

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
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            fullWidth
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

interface CommentComponentProps {
  handleCommentLikes: any;
  comment: CommentList;
  blogId: number;
  level: number;
  commentAdd: any;
  user: Profile;
}

// ==============================|| SOCIAL PROFILE - COMMENT ||============================== //

const Comment = ({ comment, handleCommentLikes, blogId, commentAdd, user, level }: CommentComponentProps) => {
  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<Element | (() => Element) | null | undefined>(null);

  const [openReply, setOpenReply] = useState(false);

  const [repliesResult, setRepliesResult] = useState<ReactElement[]>([]);

  //get token
  const { customerToken } = CustomerToken();

  //get profile customer
  const { customer } = useGetCustomer(customerToken);

  //refresh page
  const { refreshTime, refresh } = useRefresh();

  //Open chat & show reply
  const handleChangeReply = async () => {
    refresh();
    setOpenReply((prev) => !prev);
  };

  //handle refresh after reply
  useEffect(() => {
    const fetchComment = async () => {
      const data = await GetReplyComment({ id: blogId, parentCommentId: comment.id, pageNumber: 1, pageSize: 10 }, customerToken);
      if (data?.data.list.length > 0) {
        const replies = data.data.list.map((reply) => (
          <Comment
            level={level + 1}
            blogId={blogId}
            comment={reply}
            key={reply.id}
            user={user}
            commentAdd={commentAdd}
            handleCommentLikes={handleCommentLikes}
          />
        ));
        setRepliesResult(replies);
      } else {
        setRepliesResult([]);
      }
    }
    fetchComment();
  }, [refreshTime])

  const methods = useForm({
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  const onSubmit = async (reply: any, e: any) => {
    if (!customerToken) {
      throw new Error();
    }
    try {
      const comment_content = reply.name;
      const data = await PostBlogComment({ id: blogId }, { commentId: comment.id, content: comment_content }, customerToken);
      enqueueSnackbar("Bình luận của bạn đã được đăng", {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      })
    } finally {
      reset({ name: '' });
    }
  };

  const handleLike = async () => {
    if (!customerToken) {
      throw new Error();
    }
    try {
      const like = await PatchCommentReaction({ commentId: comment.id, reactionId: comment.likes.liked ? null : 1 }, customerToken);
      if (like.status == "error") {
        throw new Error();
      }
      enqueueSnackbar("Like comment thành công", {
        variant: "success",
      })
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      })
    }
  }

  return (
    <>
      {Object.keys(comment).length > 0 && (
        <Grid item xs={12} ml={level * 10}>
          <Card sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50', px: 2, pt: 2, pb: 1, mt: 1.25 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container wrap="nowrap" alignItems="center" spacing={1}>
                  <Grid item>
                    <Avatar
                      sx={{ width: 24, height: 24 }}
                      size="sm"
                      alt="User 1"
                      src={
                        comment?.profile.avatar
                          ? `${comment.profile.avatar}`
                          : `${avatarImage}/avatar-1.png`
                      }
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Typography variant="h5">{comment?.profile.fullName}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">
                          <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} /> {formatDate(comment?.createdAt, "dd/MM/yyyy")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 1.5 } }}>
                <Typography variant="body2">{comment?.content}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} sx={{ color: theme.palette.mode === ThemeMode.DARK ? 'grey.700' : 'grey.800' }}>
                  <Button
                    onClick={handleLike}
                    variant="text"
                    color="inherit"
                    size="small"
                    startIcon={<ThumbUpAltTwoToneIcon color={comment.likes.liked ? 'secondary' : 'inherit'} />}
                  >
                    {comment.likes ? comment.likes.value : 0} likes
                  </Button>
                  <Button
                    variant="text"
                    onClick={handleChangeReply}
                    color="inherit"
                    size="small"
                    startIcon={<ReplyTwoToneIcon color="primary" />}
                  >
                    {comment?.reply ? comment.reply : 0} reply
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}

      {repliesResult && repliesResult}

      {/* comment - add new replay */}
      <Collapse in={openReply} sx={{ width: '100%' }}>
        {openReply && (
          <Grid item xs={12} sx={{ ml: level * 10, pt: 3 }}>
            <Box sx={{ ml: { xs: 0, md: 4.25 } }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Avatar
                      sx={{ mt: 1.5 }}
                      alt="User 1"
                      src={customer?.avatar && customer?.avatar && `${customer.avatar}`}
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth sx={{ mt: 1 }}>
                    <FormProvider {...methods}>
                      <FormInput
                        fullWidth
                        name="name"
                        label="Write a reply..."
                        size={downMD ? 'small' : 'medium'}
                        bug={errors}
                        InputProps={{
                          label: 'Write a reply...',
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachmentRoundedIcon fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                      />
                    </FormProvider>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button type="submit" variant="contained" color="info" size={downMD ? 'small' : 'large'} sx={{ mt: 1.5 }} onClick={() => { }}>
                        Reply
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        )}
      </Collapse>
    </>
  );
};

export default Comment;
