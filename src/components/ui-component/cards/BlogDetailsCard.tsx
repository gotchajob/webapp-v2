'use client';

import * as React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';

// project imports
import { gridSpacing } from 'store/constant - vh';
import Avatar from '../extended/Avatar';
import AnimateButton from 'ui-component/extended/AnimateButton';
// types
import { ThemeMode } from 'types/config';
import { FormInputProps } from 'types';
import { BlogPost, BlogCategory, BlogTag, BlogAuthor, BlogComment } from 'types/blog';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

//third party
import * as yup from 'yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, TextField } from '@mui/material';
import ImageList from 'ui-component/extended/ImageList';

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

// ==============================|| BLOG DETAILS CARD ||============================== //

const BlogDetailsCard = ({
  id,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  categories,
  tags,
  author,
  publishedAt,
  updatedAt,
  likes,
  comments
}: BlogPost) => {
  const theme = useTheme();

  // const [openComment, setOpenComment] = React.useState(!(data.comments && data.comments.length > 0));
  const [openComment, setOpenComment] = React.useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<Element | (() => Element) | null | undefined>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | undefined) => {
    setAnchorEl(event?.currentTarget);
  };

  const methods = useForm({
    resolver: yupResolver(validationSchema)
  });

  const {
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeComment = () => {
    setOpenComment((prev) => !prev);
  };

  const handleSharedClose = () => {
    setAnchorEl(null);
  };

  const [anchorSharedEl, setAnchorSharedEl] = React.useState<Element | null>(null);
  const handleSharedClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Card
      sx={{
        p: 2,
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': { borderColor: 'primary.main' }
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: 'grey.700' }}>
            {excerpt}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {/* <img src={featuredImage} alt={title} style={{ maxWidth: '100%' }} /> */}
          <ImageList itemData={[{ img: 'img-gal-1.png', featured: true }]}></ImageList>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{content}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="caption">Categories</Typography>
              {categories.map((category: BlogCategory) => (
                <Typography key={category.id} variant="h6">
                  {category.name}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Tags</Typography>
              {tags.map((tag: BlogTag) => (
                <Typography key={tag.id} variant="h6">
                  {tag.name}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography variant="caption">Author</Typography>
          <Typography variant="h6">{author.name}</Typography>
        </Grid> */}
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="caption">Published</Typography>
              <Typography variant="h6">{new Date(publishedAt).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Last Updated</Typography>
              <Typography variant="h6">{new Date(updatedAt).toLocaleDateString()}</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth startIcon={<FavoriteBorderOutlinedIcon />}>
                {likes} Likes
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth startIcon={<CommentOutlinedIcon />}>
                {comments.length} Comments
              </Button>
            </Grid>
          </Grid>
        </Grid> */}
        {/* post comment */}
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
                  // onClick={() => handlePostLikes(id)}
                  color="inherit"
                  size="small"
                  startIcon={<ThumbUpAltTwoToneIcon color='primary' />}
                >
                  {/* {data && data.likes && data.likes.value ? data.likes.value : 0} */}0
                  <Typography color="inherit" sx={{ fontWeight: 500, ml: 0.5, display: { xs: 'none', sm: 'block' } }}>
                    likes
                  </Typography>
                </Button>
                <Button
                  onClick={handleChangeComment}
                  size="small"
                  variant="text"
                  color="inherit"
                  startIcon={<ChatBubbleTwoToneIcon color="secondary" />}
                >
                  {/* {data.comments ? data.comments.length : 0} comments */} 0 comments
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <IconButton onClick={handleSharedClick} size="large" aria-label="more options">
                <ShareTwoToneIcon sx={{ width: '16px', height: '16px' }} />
              </IconButton>
              <Menu
                id="menu-post"
                // anchorEl={anchorSharedEl}
                // keepMounted
                open={Boolean(anchorSharedEl)}
                // onClose={handleSharedClose}
                variant="selectedMenu"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                sx={{
                  '& .MuiSvgIcon-root': {
                    marginRight: '14px',
                    fontSize: '1.25rem'
                  }
                }}
              >
                <MenuItem onClick={handleSharedClose}>
                  <ShareTwoToneIcon fontSize="inherit" /> Share Now
                </MenuItem>
                <MenuItem onClick={handleSharedClose}>
                  <PeopleAltTwoToneIcon fontSize="inherit" /> Share to Friends
                </MenuItem>
                <MenuItem onClick={handleSharedClose}>
                  <ChatTwoToneIcon fontSize="inherit" /> Send in Messanger
                </MenuItem>
                <MenuItem onClick={handleSharedClose}>
                  <ContentCopyTwoToneIcon fontSize="inherit" /> Copy Link
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={openComment} sx={{ width: '100%' }}>
          {openComment && (
            <Grid item xs={12} sx={{ pt: 2 }}>
              <form>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Avatar
                      sx={{ mt: 0.75 }}
                      alt="User 1"
                      // src={profile && profile.avatar ? `${avatarImage}/${profile.avatar}` : `${avatarImage}/avatar-1.png`}
                      src=''
                      size="xs"
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <FormProvider {...methods}>
                      <FormInput bug={errors} fullWidth name="name" label="Write a comment..." size='small' />
                    </FormProvider>
                  </Grid>
                  <Grid item>
                    <AnimateButton>
                      <Button type="submit" variant="contained" color="secondary" size='small' sx={{ mt: 0.5 }}>
                        Comment
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          )}
        </Collapse>
      </Grid>
    </Card>
  );
};

export default BlogDetailsCard;