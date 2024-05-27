'use client';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import { Avatar, Rating } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import RecommendIcon from '@mui/icons-material/Recommend';
import { GetBlogCommentReq, GetBlogComment, CommentList, Profile } from 'package/api/comment';
import Comment from 'components/common/blog/Comment';

interface MainProps {
  content: ReadonlyArray<string>;
  blog: Blog;
}

interface Blog {
  id_blog: number;
  title: string;
  subtitle: string;
  avatar: string;
  name: string;
  created_at: string;
  category: string;
  reaction: Object;
  rating: number;
  id_comment: number;
  profile: Profile;
}

export default function Main(props: MainProps) {
  const { content, blog } = props;
  const [comment, setComment] = useState<CommentList[] | null>(null)
  const [openComment, setOpenComment] = useState(!(comment && comment.length > 0));

  const fetchComments = async (id: number) => {
    const data = await GetBlogComment({
      id: id,
      parentCommentId: 0,
      pageNumber: 1,
      pageSize: 12,
    }, "");
    if (data) {
      setComment(data.data.list);
    }
  }


  const handleChangeComment = (id: string) => {
    if (comment) {
      if (comment.length > 0) {
        const comments = comment.map((comment, index) => {
          <Comment
            postId={blog.id_comment.toString()}
            parentId={0}
            comment={comment}
            key={comment.id}
            user={props.blog.profile}
            level={0}
            // commentAdd={commentAdd}
            // handleCommentLikes={handleCommentLikes}
            ></Comment>
        })
      }
    }
  }

  useEffect(() => {
    fetchComments(blog.id_blog);
    console.log('comment', comment);
  }, [blog.id_blog])
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
      <Grid container sx={{ pt: 2, py: 2 }} alignItems="center">
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
