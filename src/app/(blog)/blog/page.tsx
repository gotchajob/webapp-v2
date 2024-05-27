'use client';

import React, { useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

// project imports
import { gridSpacing } from 'store/constant';
import BlogDetailsCard from 'ui-component/cards/BlogDetailsCard';
import MainCard from 'ui-component/cards/MainCard';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { IconSearch } from '@tabler/icons-react';

// types
import { Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';
import { TabsProps } from 'types';
import { BlogPost } from 'types/blog';
import { ThemeMode } from 'types/config';
import { BlogList, GetBlog } from 'package/api/blog';

// material-ui
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';


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


// tabs panel
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

// ally props
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'Profile',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Billing',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
];


// ==============================|| USER CARD STYLE 1 ||============================== //

const BlogStyle = () => {
    const [blogs, setBlogs] = React.useState<BlogPost[] | null>(null);
    const [blogList, setBlogsList] = React.useState<BlogList[] | null>(null);

    const fetchBlogList = async () => {
        const data = await GetBlog({ pageNumber: 1, pageSize: 12 }, "");
        console.log(1)
        if (data) {
            console.log('data', data)
            setBlogsList(data.data.list);
        }
    }


    React.useEffect(() => {
        // fetchData().then(data => setBlogs(data));
        // setBlogs(fakeBlogPosts);
        console.log('Blog ne1');
        fetchBlogList();

        console.log('Blog ne2');
    }, []);

    const [anchorEl, setAnchorEl] = React.useState<Element | (() => Element) | null | undefined>(null);
    const handleClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                return (
                    title.includes(searchTerm)
                );
            });

            setBlogs(filteredBlogs);
        }
    };

    let blogResult: React.ReactElement | React.ReactElement[] = <></>;
    if (blogList) {
        blogResult = blogList.map((blog, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4} xl={3}>
                <BlogDetailsCard
                    id={blog.id}
                    title={blog.title}
                    thumbnail={blog.thumbnail}
                    shortDescription={blog.shortDescription}
                    createAt={blog.createAt}
                    profile={blog.profile}
                />
            </Grid>
        ));
    }

    const theme = useTheme();

    const [value, setValue] = useState<number>(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    // React.useEffect(() => {
    //     fetchBlogList();
    //     console.log('Blog ne')
    // }, []);

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center" justifyContent="space-evenly" spacing={gridSpacing} >
                            <Grid item xs={6}>
                                <Typography variant="h3">Blog Posts</Typography>
                            </Grid>
                            <Grid item xs={6}>
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
                    </Grid>
                    <Grid item>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Tabs
                                    value={value}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={() => { }}
                                    aria-label="simple tabs example"
                                    variant="scrollable"
                                    sx={{
                                        mb: 3,
                                        '& a': {
                                            minHeight: 'auto',
                                            minWidth: 10,
                                            py: 1.5,
                                            px: 1,
                                            mr: 2.25,
                                            color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        '& a.Mui-selected': {
                                            color: 'primary.main'
                                        },
                                        '& .MuiTabs-indicator': {
                                            bottom: 2
                                        },
                                        '& a > svg': {
                                            marginBottom: '0px !important',
                                            mr: 1.25
                                        }
                                    }}
                                >
                                    {tabsOption.map((tab, index) => (
                                        <Tab key={index} component={Link} href="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                                    ))}
                                </Tabs>
                                <TabPanel value={value} index={0}>

                                </TabPanel>
                                <TabPanel value={value} index={1}>

                                </TabPanel>
                            </Grid>
                        </Grid>
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