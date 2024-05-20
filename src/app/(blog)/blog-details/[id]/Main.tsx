'use client';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import { Avatar, Rating } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import RecommendIcon from '@mui/icons-material/Recommend';

interface MainProps {
  content: ReadonlyArray<string>;
  blog: Blog;
  // title: string;
  // avatar: string;
  // category: string;
  // created_at: string;
  // reaction: Object;
  // rating: Number;
  // name: string;
}

interface Blog {
  title: string;
  subtitle: string;
  avatar: string;
  name: string;
  created_at: string;
  category: string;
  reaction: Object;
  rating: number;
}

export default function Main(props: MainProps) {
  const { content, blog } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
        py: 10
      }}
    >
      <Typography variant="h1" gutterBottom>
        {blog.title}
      </Typography>
      <Divider />
      <Grid container sx={{ pt: 2 }} alignItems="center">
        <Grid item xs={1}>
          <Avatar alt='' src={`${blog.avatar}`}></Avatar>
        </Grid>
        <Grid item xs={3} container justifyContent="center" textAlign="center">
          <Typography>Chia sẻ bởi: {blog.name}</Typography>
        </Grid>
        <Grid item xs={8} container justifyContent="flex-end">
          <Rating value={blog.rating} readOnly></Rating>
        </Grid>
      </Grid>
      {content.map((post) => (
        <Markdown className="markdown" key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))}
      <Divider></Divider>
      <Grid container sx={{ pt: 2, py: 2}} alignItems="center">
        <Grid item xs={1} container alignItems="center">
          <CommentIcon fontSize='medium'></CommentIcon>
          <Typography alignItems="center"> 5 </Typography>
        </Grid>
        <Grid item xs={1} container alignItems="center">
          <RecommendIcon fontSize='medium'></RecommendIcon>
          <Typography alignItems="center"> 5 </Typography>
        </Grid>
        <Grid item xs={10} container justifyContent="flex-end">
          <Typography alignItems="center">Ngày tạo: {blog.created_at}</Typography>
        </Grid>
      </Grid>
      <Divider></Divider>
    </Grid>
  );
}
