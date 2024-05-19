'use client';

import React from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { getUniqueCategories } from 'utils/utils';

// project imports
import BlogDetailsCard from 'ui-component/cards/BlogDetailsCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { dispatch, useSelector } from 'store';
import { getDetailCards, filterDetailCards } from 'store/slices/user';

// assets
import { IconSearch } from '@tabler/icons-react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// types
import { UserProfile } from 'types/user-profile';
import { BlogPost, BlogPostData } from 'types/blog';

const fakeBlogPosts: BlogPost[] = [
  {
    "id": "1",
    "title": "Bài viết số 1",
    "slug": "bai-viet-so-1",
    "excerpt": "Đây là trích đoạn cho bài viết số 1.",
    "content": "Nội dung của bài viết số 1...",
    "featuredImage": "https://via.placeholder.com/600x400?text=Featured+Image+1",
    "categories": [
      {
        "id": "2",
        "name": "Khoa học"
      }
    ],
    "tags": [
      {
        "id": "2",
        "name": "Machine Learning"
      },
      {
        "id": "3",
        "name": "Blockchain"
      }
    ],
    "author": {
      "id": "1",
      "name": "Tác giả 2",
      "avatar": "https://via.placeholder.com/50x50?text=Avatar+4",
      "bio": "Tác giả 9 là một chuyên gia về công nghệ AI."
    },
    "publishedAt": "2023-11-30T20:50:00.000Z",
    "updatedAt": "2023-11-30T20:50:00.000Z",
    "likes": 55,
    "comments": []
  },
  {
    "id": "2",
    "title": "Bài viết số 2",
    "slug": "bai-viet-so-2",
    "excerpt": "Đây là trích đoạn cho bài viết số 2.",
    "content": "Nội dung của bài viết số 2...",
    "featuredImage": "https://via.placeholder.com/600x400?text=Featured+Image+2",
    "categories": [
      {
        "id": "2",
        "name": "Khoa học"
      }
    ],
    "tags": [
      {
        "id": "3",
        "name": "Blockchain"
      },
      {
        "id": "1",
        "name": "AI"
      }
    ],
    "author": {
      "id": "1",
      "name": "Tác giả 9",
      "avatar": "https://via.placeholder.com/50x50?text=Avatar+5",
      "bio": "Tác giả 9 là một chuyên gia về công nghệ AI."
    },
    "publishedAt": "2023-06-07T20:27:00.000Z",
    "updatedAt": "2023-06-07T20:27:00.000Z",
    "likes": 57,
    "comments": []
  }
]


// ==============================|| USER CARD STYLE 1 ||============================== //

const BlogStyle = () => {
  const [blogs, setBlogs] = React.useState<BlogPost[] | null>(null); // Sử dụng dữ liệu giả
  // const { blogPosts } = useSelector((state) => state.);

  // React.useEffect(() => {
  //   setBlogs(blogPosts);
  // }, [blogPosts]);

  React.useEffect(() => {
    // fetchData().then(data => setBlogs(data));
    setBlogs(fakeBlogPosts);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState<Element | (() => Element) | null | undefined>(null);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [search, setSearch] = React.useState<string | undefined>('');
  // const handleSearch = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
  //   const newString = event?.target.value;
  //   setSearch(newString);

  //   if (newString) {
  //     dispatch(filterDetailCards(newString));
  //   } else {
  //     dispatch(getDetailCards());
  //   }
  // };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    const searchTerm = event?.target.value;
    setSearch(searchTerm);

    if (!searchTerm) {
      setBlogs(fakeBlogPosts);
    } else {
      const filteredBlogs = fakeBlogPosts.filter((blog) => {
        const title = blog.title
        // const excerpt = blog.excerpt.toLowerCase();
        // const content = blog.content.toLowerCase();
        // const authorName = blog.author.name.toLowerCase();
        // const categoryNames = blog.categories.map((category) => category.name.toLowerCase());
        // const tagNames = blog.tags.map((tag) => tag.name.toLowerCase());

        return (
          title.includes(searchTerm)
          // excerpt.includes(searchTerm) ||
          // content.includes(searchTerm) ||
          // authorName.includes(searchTerm) ||
          // categoryNames.some((category) => category.includes(searchTerm)) ||
          // tagNames.some((tag) => tag.includes(searchTerm))
        );
      });

      setBlogs(filteredBlogs);
    }
  };

  let blogResult: React.ReactElement | React.ReactElement[] = <></>;
  if (blogs) {
    blogResult = blogs.map((blog, index) => (
      <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
        <BlogDetailsCard
          id={blog.id}
          title={blog.title}
          slug={blog.slug}
          excerpt={blog.excerpt}
          content={blog.content}
          featuredImage={blog.featuredImage}
          categories={blog.categories}
          tags={blog.tags}
          author={blog.author}
          publishedAt={blog.publishedAt}
          updatedAt={blog.updatedAt}
          likes={blog.likes}
          comments={blog.comments}
        />
      </Grid>
    ));
  }

  return (
    <MainCard
      title={
        <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
          <Grid item>
            <Typography variant="h3">Blog Posts</Typography> {/* Thay đổi tiêu đề */}
          </Grid>
          <Grid item>
            <OutlinedInput
              id="input-search-card-style1"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <IconSearch stroke={1.5} size="16px" />
                </InputAdornment>
              }
              size="small"
            />
          </Grid>
        </Grid>
      }
    >
      <Grid container direction="row" spacing={gridSpacing}>
        {blogResult}
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination count={10} color="primary" />
            </Grid>
            <Grid item>
              <Button
                variant="text"
                size="large"
                sx={{ color: 'grey.900' }}
                color="inherit"
                endIcon={<ExpandMoreRoundedIcon />}
                onClick={handleClick}
              >
                10 Rows
              </Button>
              {anchorEl && (
                <Menu
                  id="menu-user-card-style1"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  variant="selectedMenu"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
                  <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
                  <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
                </Menu>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default BlogStyle;