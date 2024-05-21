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
        "content": `<div id="tiny-react_49320495411716132670774" class="mce-content-body" contenteditable="true" style="position: relative;" spellcheck="false">
    <p>John Ternus và Greg Joswiak (gọi tắt là Joz), hai phó chủ tịch cao cấp của Apple mới đây đã có cuộc phỏng vấn với trang Fast Company chia sẻ về tầm nhìn của Apple đối với iPad, chip M4, trí tuệ nhân tạo (AI) và những yếu tố tạo nên tính "chuyên nghiệp" của iPad.</p>
    <p>Phần thú vị nhất của bài phỏng vấn có lẽ là lời chia sẻ của Joz: "Tôi ngần ngại gọi iPad là 'máy tính bảng' (tablet) bởi vì máy tính bảng thông thường quá 'lởm' (suck). Nhưng iPad thì khác."</p>
    <p><br>Ông Greg Joswiak.<br>iPad Pro 2024được trang bị chip M4 mới, mang đến màn hình OLED kép.</p>
    <p>John Ternus, Phó chủ tịch cấp cao về Kỹ thuật phần cứng của Apple, cho biết nhờ trang bị M4 mà dòng iPad Pro đã có những cải tiến đáng kể như vượt qua giới hạn về độ mỏng mà không ảnh hưởng đến hiệu năng, thời lượng pin và độ bền cũng không bị ảnh hưởng.</p>
    <p>iPad Pro M4 đi kèm với một loạt phụ kiện mới, bao gồm Magic Keyboard bằng nhôm với các phím chức năng mới, bàn di chuột lớn hơn và Apple Pencil Pro được cải tiến.</p>
    <p><br>Ternus cho biết, họ đã cải thiện cách sạc Apple Pencil Pro bằng cách thiết kế một kiến trúc hoàn toàn mới.Kích thước của giải pháp sạc cảm ứng từ tính đã được giảm xuống một nửa so với phiên bản trước giúp tất cả các thành phần này có thể hoạt động cùng nhau và hoạt động bình thường.</p>
    <p><br>iPad Pro M4 và bàn phím Magic Keyboard và Apple Pencil Pro.<br>Greg Joswiak, Phó chủ tịch cấp cao về Tiếp thị Toàn cầu của Apple, cũng tiết lộ về việc Apple đang "đơn giản hóa dòng sản phẩm Apple Pencil". Tuy nhiên, có thể Apple Pencil và Apple Pencil 2 ban đầu sẽ cần ngừng sản xuất để đạt được mục tiêu này hoàn toàn.</p>
    <p>Cuộc phỏng vấn cũng thảo luận về AI, máy tính Mac và cách Apple định nghĩa một chiếc iPad "chuyên nghiệp". Các lãnh đạo cao cấp của Apple cho biết, Mac và iPad là hai công cụ rất khác nhau. Mặc dù cả hai thiết bị đều có thể thực hiện nhiều tác vụ tương tự nhưng iPad vẫn khác biệt so với Mac ở một số điểm, bao gồm khả năng điều khiển cảm ứng, hỗ trợ bút Apple Pencil và 5G tích hợp. Thực tế,</p>
</div>`,
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
        "content": `<div id="tiny-react_49320495411716132670774" class="mce-content-body" contenteditable="true" style="position: relative;" spellcheck="false">
    <p>John Ternus và Greg Joswiak (gọi tắt là Joz), hai phó chủ tịch cao cấp của Apple mới đây đã có cuộc phỏng vấn với trang Fast Company chia sẻ về tầm nhìn của Apple đối với iPad, chip M4, trí tuệ nhân tạo (AI) và những yếu tố tạo nên tính "chuyên nghiệp" của iPad.</p>
    <p>Phần thú vị nhất của bài phỏng vấn có lẽ là lời chia sẻ của Joz: "Tôi ngần ngại gọi iPad là 'máy tính bảng' (tablet) bởi vì máy tính bảng thông thường quá 'lởm' (suck). Nhưng iPad thì khác."</p>
    <p><br>Ông Greg Joswiak.<br>iPad Pro 2024được trang bị chip M4 mới, mang đến màn hình OLED kép.</p>
    <p>John Ternus, Phó chủ tịch cấp cao về Kỹ thuật phần cứng của Apple, cho biết nhờ trang bị M4 mà dòng iPad Pro đã có những cải tiến đáng kể như vượt qua giới hạn về độ mỏng mà không ảnh hưởng đến hiệu năng, thời lượng pin và độ bền cũng không bị ảnh hưởng.</p>
    <p>iPad Pro M4 đi kèm với một loạt phụ kiện mới, bao gồm Magic Keyboard bằng nhôm với các phím chức năng mới, bàn di chuột lớn hơn và Apple Pencil Pro được cải tiến.</p>
    <p><br>Ternus cho biết, họ đã cải thiện cách sạc Apple Pencil Pro bằng cách thiết kế một kiến trúc hoàn toàn mới.Kích thước của giải pháp sạc cảm ứng từ tính đã được giảm xuống một nửa so với phiên bản trước giúp tất cả các thành phần này có thể hoạt động cùng nhau và hoạt động bình thường.</p>
    <p><br>iPad Pro M4 và bàn phím Magic Keyboard và Apple Pencil Pro.<br>Greg Joswiak, Phó chủ tịch cấp cao về Tiếp thị Toàn cầu của Apple, cũng tiết lộ về việc Apple đang "đơn giản hóa dòng sản phẩm Apple Pencil". Tuy nhiên, có thể Apple Pencil và Apple Pencil 2 ban đầu sẽ cần ngừng sản xuất để đạt được mục tiêu này hoàn toàn.</p>
    <p>Cuộc phỏng vấn cũng thảo luận về AI, máy tính Mac và cách Apple định nghĩa một chiếc iPad "chuyên nghiệp". Các lãnh đạo cao cấp của Apple cho biết, Mac và iPad là hai công cụ rất khác nhau. Mặc dù cả hai thiết bị đều có thể thực hiện nhiều tác vụ tương tự nhưng iPad vẫn khác biệt so với Mac ở một số điểm, bao gồm khả năng điều khiển cảm ứng, hỗ trợ bút Apple Pencil và 5G tích hợp. Thực tế,</p>
</div>`,
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
        setBlogs(fakeBlogPosts);
    }, []);

    // const getPost = async () => {
    //     dispatch(getPosts());
    // };

    // React.useEffect(() => {
    //     setPosts(userState.posts);
    // }, [userState]);

    // React.useEffect(() => {
    //     getPost();
    // }, []);

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