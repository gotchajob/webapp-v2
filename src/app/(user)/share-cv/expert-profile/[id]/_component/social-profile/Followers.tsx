'use client';

import React from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

// project imports
import FollowerCard from 'ui-component/cards/FollowerCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { dispatch, useSelector } from 'store';
import { getFollowers, filterFollowers } from 'store/slices/user';

// assets
import { IconSearch } from '@tabler/icons-react';

// types
import { FollowerCardProps } from 'types/user';
import { CustomerReview } from 'components/review';
import { useGetCustomerBookingTotalRating } from 'hooks/use-get-customer-booking-total-rating';
import { useRefresh } from 'hooks/use-refresh';

// ==============================|| SOCIAL PROFILE - FOLLOWERS ||============================== //

const Followers = ({ expertId }: { expertId: number }) => {
  const { refresh, refreshTime } = useRefresh();
  const { ratingParams } = useGetCustomerBookingTotalRating({ expertId }, { expertId }, refreshTime);
  return ratingParams && <CustomerReview ratingParams={ratingParams} />;
};

export default Followers;
