'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

// project imports
import { gridSpacing } from 'store/constant - vh';
import Avatar from '../extended/Avatar';
import AnimateButton from 'ui-component/extended/AnimateButton';
// types
import { ThemeMode } from 'types/config';
import { FormInputProps } from 'types';
import { BlogList } from 'package/api/blog';

// third party
import * as yup from 'yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormHelperText, TextField } from '@mui/material';
import ImageList from 'ui-component/extended/ImageList';

const validationSchema = yup.object().shape({
  name: yup.string().required('Comment Field is Required')
});

// ==============================|| COMMENT TEXTFIELD ||============================== //

// const getFirstElementHtml = (htmlString: string): string => {
//   const parsed = parse(htmlString) as Element | Element[];
//   if (Array.isArray(parsed)) {
//     return parsed[0].props.children;
//   } else {
//     return parsed.props.children;
//   }
// };

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
  thumbnail,
  shortDescription,
  createAt,
  profile

}: BlogList) => {
  const theme = useTheme();
  const router = useRouter();  // Call useRouter here

  // const handleCardClick = () => {
  //   router.push(`localhost:3000/blog-details/${id}`);
  // };

  // const contentArray = content.split('<');

  // let firstPart = contentArray[2];

  // firstPart = firstPart.replace('<p>', '');

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

  React.useEffect(() => {
    console.log("Thằng card blog nè")
  },[])

  return (
    <Card
      sx={{
        p: 2,
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': { borderColor: 'primary.main', cursor: 'pointer' }
      }}
      // onClick={handleCardClick}
      onClick={() => router.push(`/blog/${id}`)}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: 'grey.700' }}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ImageList itemData={[{ img: `${thumbnail}`, featured: true }]}></ImageList>
        </Grid>
        <Grid item xs={12}>
          {/* <Typography variant="body1">{content}</Typography> */}
          <Typography variant="body1">{shortDescription}</Typography>
        </Grid>
        {/* <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {/* <Grid item xs={6}>
              <Typography variant="caption">Categories</Typography>
              {categories.map((category: BlogCategory) => (
                <Typography key={category.id} variant="h6">
                  {category.name}
                </Typography>
              ))}
            </Grid> */}
            {/* <Grid item xs={12}>
              <Typography variant="caption">Tags</Typography>
              {tags.map((tag: BlogTag) => (
                <Typography key={tag.id} variant="h6">
                  {tag.name}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="caption">Published</Typography>
              <Typography variant="h6">{createAt}</Typography>
            </Grid>
            {/* <Grid item xs={6}>
              <Typography variant="caption">Last Updated</Typography>
              <Typography variant="h6">{new Date(updatedAt).toLocaleDateString()}</Typography>
            </Grid> */}
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
