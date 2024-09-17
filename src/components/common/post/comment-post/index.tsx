'use client';

import { useState, ReactElement } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
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
import { CommentType } from '../interface';
// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ReplyTwoToneIcon from '@mui/icons-material/ReplyTwoTone';
import AttachmentRoundedIcon from '@mui/icons-material/AttachmentRounded';

const avatarImage = '/assets/images/users';
// types
import { FormInputProps } from 'types';
import { ThemeMode } from 'types/config';
import { Rating } from '@mui/material';

const validationSchema = yup.object().shape({
  name: yup.string().required('Reply Field is Required')
});

// ==============================|| COMMENT TEXTFIELD ||============================== //

interface CommentComponentProps {
  comment: CommentType;
}

// ==============================|| SOCIAL PROFILE - COMMENT ||============================== //

export const Comment = ({ comment }: CommentComponentProps) => {
  const theme = useTheme();
  console.log(comment);
  return (
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
                  comment.user && comment.user.avatar ? `${avatarImage}/${comment.user.avatar}` : `${avatarImage}/avatar-1.png`
                }
              />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="h5">{comment.user.fullName}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Rating precision={0.5} value={comment.rating} />
        </Grid>
        <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 1.5 } }}>
          <Typography variant="body2">{comment.comment}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
