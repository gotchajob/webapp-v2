'use client';

import { useEffect, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import RateReviewTwoToneIcon from '@mui/icons-material/RateReviewTwoTone';
import { StyledLink } from 'components/common/link/styled-link';
import { formatDate } from 'package/util';
import SubCard from 'ui-component/cards/SubCard';
import ProductReview from './ProductReview';
import { CommentData } from 'components/common/post/interface';
import { Comment } from 'components/common/post/comment-post';

interface ProgressProps {
  like: number;
  star: number;
  value: number;
  color?: 'inherit' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined;
}

// progress
function LinearProgressWithLabel({ like, star, color, value, ...others }: ProgressProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 50 }}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(star)} Stars`}</Typography>
      </Box>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress value={value} variant="determinate" color={color} {...others} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="subtitle1">{`(${Math.round(like)})`}</Typography>
      </Box>
    </Box>
  );
}

export interface RatingParams {
  totalRatingList: TotalRating[];
  feedbackList: any[];
}

interface TotalRating {
  rating: number;
  count: number;
}

interface TotalRatingPercent extends TotalRating {
  percent: number;
}



export const CustomerReview = ({ ratingParams }: { ratingParams: RatingParams }) => {
  const { total, numberRating, totalRatingPercentList } = calculateTotalRating(ratingParams.totalRatingList);
console.log(ratingParams.feedbackList)
  const RenderTotalRating = (
    <MainCard content={false} sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        {ratingParams.totalRatingList && (
          <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ height: '100%' }}>
            <Typography variant="subtitle1">Average Rating</Typography>
            <Typography variant="h1" color="primary">
              {Number(total || 0).toFixed(1)}/5
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating
                name="simple-controlled"
                value={total}
                icon={<StarTwoToneIcon fontSize="inherit" />}
                emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
                readOnly
                precision={0.1}
              />
              <Typography pt={0.4}>({numberRating} lượt)</Typography>
            </Stack>
          </Stack>
        )}
      </CardContent>
    </MainCard>
  );

  const RenderDetailRating = (
    <MainCard content={false} sx={{ height: '100%' }}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
          {totalRatingPercentList.map((value, index) => (
            <Grid item xs={12} key={index}>
              <LinearProgressWithLabel color="secondary" star={value.rating} value={value.percent} like={value.count} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </MainCard>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        {RenderTotalRating}
      </Grid>
      <Grid item xs={4}>
        {RenderDetailRating}
      </Grid>
      <Grid item xs={12}>
        {ratingParams.feedbackList.map((comment, index) => (
          <Grid item xs={12} key={index}>
            <Comment comment={comment} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center">
          <Button variant="text"> Load more Comments </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

const calculateTotalRating = (totalRatingList: TotalRating[]) => {
  let total = 0;
  let numberRating = 0;
  let totalRatingPercentList: TotalRatingPercent[] = [];

  totalRatingList.forEach((value) => {
    total = total + value.rating * value.count;
    numberRating = numberRating + value.count;
  });

  totalRatingList.forEach((value) => {
    const newRatingPercent: TotalRatingPercent = {
      ...value,
      percent: (value.count / numberRating) * 100
    };
    totalRatingPercentList.push(newRatingPercent);
  });
  return { total: total / numberRating, numberRating, totalRatingPercentList };
};
