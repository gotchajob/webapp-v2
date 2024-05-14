'use client';

import React from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import Posts from 'ui-component/cards/Post';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { dispatch, useSelector } from 'store';
import { getPosts, editComment, addComment, addReply, likePost, likeComment, likeReply } from 'store/slices/user';

// types
import { ThemeMode } from 'types/config';
import { PostDataType, Reply } from 'types/user-profile';

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';
import BlogDetailsCard from 'ui-component/cards/BlogDetailsCard';


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

// ==============================|| SOCIAL PROFILE - POST ||============================== //

const Profile = () => {
    const theme = useTheme();
    const [posts, setPosts] = React.useState<PostDataType[]>([]);
    const [blogs, setBlogs] = React.useState<BlogPost[] | null>(null);
    const userState = useSelector((state) => state.user);

    React.useEffect(() => {
        // fetchData().then(data => setBlogs(data));
        setBlogs(fakeBlogPosts);
    }, []);
    const getPost = async () => {
        dispatch(getPosts());
    };

    React.useEffect(() => {
        setPosts(userState.posts);
    }, [userState]);

    React.useEffect(() => {
        getPost();
    }, []);

    const editPost = async (id: string, commentId: string) => {
        dispatch(editComment(id, commentId));
    };

    const commentAdd = async (id: string, comment: Reply) => {
        dispatch(addComment(id, comment));
    };

    const replyAdd = async (postId: string, commentId: string, reply: Reply) => {
        dispatch(addReply(postId, commentId, reply));
    };

    const handlePostLikes = async (postId: string) => {
        dispatch(likePost(postId));
    };

    const handleCommentLikes = async (postId: string, commentId: string) => {
        dispatch(likeComment(postId, commentId));
    };

    const handleReplayLikes = async (postId: string, commentId: string, replayId: string) => {
        dispatch(likeReply(postId, commentId, replayId));
    };

    let blogResult: React.ReactElement | React.ReactElement[] = <></>;
    if (blogs) {
        blogResult = blogs.map((blog, index) => (
            <Grid key={index} item xs={12}>
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

    const sideAvatarSX = {
        borderRadius: '8px',
        width: 48,
        height: 48,
        fontSize: '1.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: theme.palette.mode === ThemeMode.DARK ? '1px solid' : 'none',
        '&>svg': {
            width: 24,
            height: 24
        }
    };

    const [search, setSearch] = React.useState<string | undefined>('');
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

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12} md={4}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <MainCard>
                            <Grid container alignItems="center" spacing={gridSpacing}>
                                <Grid item>
                                    <Box
                                        sx={{
                                            ...sideAvatarSX,
                                            bgcolor: alpha(theme.palette.primary.dark, 0.1),
                                            border: theme.palette.mode === ThemeMode.DARK ? '1px solid' : 'none',
                                            borderColor: 'primary.main',
                                            color: 'primary.dark'
                                        }}
                                    >
                                        <PeopleAltTwoToneIcon />
                                    </Box>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="h3" color="primary" sx={{ mb: 0.625 }}>
                                        239k
                                    </Typography>
                                    <Typography variant="body2">Friends</Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton size="large" aria-label="navigation icon">
                                        <NavigateNextRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Divider sx={{ margin: '16px 0' }} />
                            <Grid container alignItems="center" spacing={gridSpacing}>
                                <Grid item>
                                    <Box
                                        sx={{
                                            ...sideAvatarSX,
                                            bgcolor: alpha(theme.palette.secondary.dark, 0.1),
                                            borderColor: 'secondary.main',
                                            color: 'secondary.dark'
                                        }}
                                    >
                                        <RecentActorsTwoToneIcon />
                                    </Box>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            mb: 0.625,
                                            color: theme.palette.mode === ThemeMode.DARK ? 'text.secondary' : 'secondary.main'
                                        }}
                                    >
                                        234k
                                    </Typography>
                                    <Typography variant="body2">Followers</Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton size="large" aria-label="navigation icon">
                                        <NavigateNextRoundedIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12}>
                        <MainCard>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">About</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its
                                        layout.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider sx={{ margin: '16px 0' }} />
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    '& >div': {
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'block',
                                        width: '100%'
                                    },
                                    '& a': {
                                        color: 'grey.700',

                                        '& svg': {
                                            mr: 1,
                                            verticalAlign: 'bottom'
                                        },
                                        '&:hover': {
                                            color: 'primary.main',
                                            textDecoration: 'none'
                                        }
                                    }
                                }}
                            >
                                <Grid item xs={12}>
                                    <Link href="https://codedthemes.com/" target="_blank" underline="hover">
                                        <PublicTwoToneIcon color="secondary" /> https://codedthemes.com/
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="https://www.instagram.com/codedthemes" target="_blank" underline="hover">
                                        <InstagramIcon sx={{ color: 'orange.dark' }} /> https://www.instagram.com/codedthemes
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="https://www.facebook.com/codedthemes" target="_blank" underline="hover">
                                        <FacebookIcon color="primary" /> https://www.facebook.com/codedthemes
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="https://in.linkedin.com/company/codedthemes" target="_blank" underline="hover">
                                        <LinkedInIcon sx={{ color: 'grey.900' }} /> https://in.linkedin.com/company/codedthemes
                                    </Link>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
                <Grid container spacing={gridSpacing}>
                    {/* <Grid item xs={12}>
                        <MainCard>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <TextField id="outlined-textarea" placeholder="What’s on your mind, Larry?" rows={4} fullWidth multiline />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                                        <Grid item>
                                            <Button variant="text" color="secondary" startIcon={<AttachmentTwoToneIcon />}>
                                                Gallery
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button variant="contained" color="secondary" startIcon={<LayersTwoToneIcon />}>
                                                    Post
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid> */}
                    {/* {posts &&
                        posts.map((post: PostDataType, index: number) => (
                            <Grid key={post.id} item xs={12}>
                                <Posts
                                    key={post.id}
                                    post={post}
                                    editPost={editPost}
                                    renderPost={getPost}
                                    setPosts={setPosts}
                                    commentAdd={commentAdd}
                                    replyAdd={replyAdd}
                                    handlePostLikes={handlePostLikes}
                                    handleCommentLikes={handleCommentLikes}
                                    handleReplayLikes={handleReplayLikes}
                                />
                            </Grid>
                        ))} */}
                    {blogResult}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
