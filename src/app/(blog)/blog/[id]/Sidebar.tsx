import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Divider } from '@mui/material';
import { RelatedBlog } from 'package/api/blog/id';

interface SidebarProps {
  // archives: ReadonlyArray<{
  //   url: string;
  //   title: string;
  // }>;
  // description: string;
  // social: ReadonlyArray<{
  //   icon: React.ElementType;
  //   name: string;
  // }>;
  // title: string;
  relatedBlog: ReadonlyArray<RelatedBlog>;
}

// interface RelatedBlog {
//   image: string;
//   title: string;
// }

export default function Sidebar(props: SidebarProps) {
  const { relatedBlog } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 1 }}>
        <Typography variant="h2" gutterBottom>
          Có thể bạn quan tâm
        </Typography>
      </Paper>
      <Divider></Divider>
      {relatedBlog ? relatedBlog.map((blog) => (
        // <Link display="block" variant="body1" href={archive.url} key={archive.title}>
        //   {archive.title}
        // </Link>
        <Grid container sx={{ pt: 2 }} alignItems="center" spacing={8}>
          <Grid item xs={2}>
            <img alt='' src={`${blog.thumbnail}`} style={{height: 60, width: 60}}></img>
          </Grid>
          <Grid item xs={10}>
            <Typography variant='h4'>{blog.title}</Typography>
          </Grid>
        </Grid>
      )) : <Typography>Không có bài viết liên quan</Typography>}
      {/* <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Archives
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))} */}
    </Grid>
  );
}
