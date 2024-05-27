'use client';

import { useState, ReactElement } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// third-party
import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { CommentData } from '../interface';
import { CommentList, GetBlogComment, Profile } from 'package/api/comment';
// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';

const avatarImage = '/assets/images/users';
// types
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
  comment: CommentList;
  postId: string;
  level: number;
  user: Profile;
  parentId: number;
}

// ==============================|| SOCIAL PROFILE - COMMENT ||============================== //

const Comment = ({ comment, parentId, postId, user, level }: CommentComponentProps) => {

  const theme = useTheme();

  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<Element | (() => Element) | null | undefined>(null);

  const [repliesResult, setRepliesResult] = useState<ReactElement[]>([]);

  const [comments, setComments] = useState<CommentList[] | null>(null)

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openReply, setOpenReply] = useState(false);

  const fetchComments = async (id: number) => {
    const data = await GetBlogComment({
      id: id,
      parentCommentId: 0,
      pageNumber: 1,
      pageSize: 12,
    }, "");
    if (data) {
      setComments(data.data.list);
    }
  }

  const handleChangeReply = (id: string) => {
    if (comments) {
      if (comments.length > 0) {
        console.log('1');
        const replies = comments.map((reply) => (
          <Comment
            level={level + 1}
            parentId={0}
            postId={postId}
            comment={reply}
            key={reply.id}
            user={user}
          />
        ));
        setRepliesResult(replies);
        console.log(replies);
      } else {
        setRepliesResult([]);
      }
    }
    setOpenReply((prev) => !prev);
  };

  const methods = useForm({
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  const onSubmit = async (reply: CommentData, e: any) => {
    // handleChangeReply();
    const replyId = uniqueId('#REPLY_');
    const newReply = {
      id: replyId,
      profile: user,
      data: {
        comment: reply.name,
        likes: {
          like: false,
          value: 0
        },
        replies: []
      }
    };

    // commentAdd(postId, comment.id, newReply);
    reset({ name: '' });
  };

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
                        comment.profile && comment.profile.avatar
                          ? `${avatarImage}/${comment.profile.avatar}`
                          : `${avatarImage}/avatar-1.png`
                      }
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Typography variant="h5">{comment.profile.fullName}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="caption">
                          <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} /> {comment.createAt}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 1.5 } }}>
                <Typography variant="body2">{comment.content}</Typography>
              </Grid>
              {/* <Grid item xs={12}>
                <Stack direction="row" spacing={2} sx={{ color: theme.palette.mode === ThemeMode.DARK ? 'grey.700' : 'grey.800' }}>
                  <Button
                    onClick={() => handleCommentLikes(postId, comment.id)}
                    variant="text"
                    color="inherit"
                    size="small"
                    startIcon={<ThumbUpAltTwoToneIcon color={comment.data?.likes && comment.data?.likes.like ? 'secondary' : 'inherit'} />}
                  >
                    {comment.data?.likes && comment.data?.likes.value ? comment.data?.likes.value : 0} likes
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => handleChangeReply(comment.id)}
                    color="inherit"
                    size="small"
                    startIcon={<ReplyTwoToneIcon color="primary" />}
                  >
                    {comment.data?.replies ? comment.data?.replies : 0} reply
                  </Button>
                </Stack>
              </Grid> */}
            </Grid>
          </Card>
        </Grid>
      )}

      {repliesResult ? repliesResult : <></>}

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
                      src={comment.profile && comment.profile.avatar && `${avatarImage}/${comment.profile.avatar}`}
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
                      <Button type="submit" variant="contained" color="secondary" size={downMD ? 'small' : 'large'} sx={{ mt: 1.5 }}>
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
