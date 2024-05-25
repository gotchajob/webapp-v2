'use client';

import { useEffect, useState, SyntheticEvent } from 'react';
import { useParams } from 'next/navigation';
// import { useRouter } from 'next/router';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// project imports
import { BlogDetailData, getBlogDetail } from 'package/api/blog/id';

// types
import { TabsProps } from 'types';
import { Container } from '@mui/material';
import Main from './Main';
import Sidebar from './Sidebar';

function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`blog-details-tabpanel-${index}`}
            aria-labelledby={`blog-details-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </Box>
    );
}

type Props = {
    id: number;
};

const BlogDetails = ({ id }: Props) => {
    const [blog, setBlog] = useState<BlogDetailData | null>(null);
    const params = useParams();
    const fetchBlogDetail = async (id: number) => {
        const data = await getBlogDetail({ id: id }, '');
        if (data) {
            console.log('data_blog', data);
            setBlog(data.data);
        }
    }
    const blog_post = {
        "title": "Understanding the Basics of React",
        "subtitle": "A comprehensive guide to getting started with React",
        "content": `<div id="tiny-react_49320495411716132670774" class="mce-content-body" contenteditable="true" style="position: relative;" spellcheck="false">
    <p>John Ternus và Greg Joswiak (gọi tắt là Joz), hai phó chủ tịch cao cấp của Apple mới đây đã có cuộc phỏng vấn với trang Fast Company chia sẻ về tầm nhìn của Apple đối với iPad, chip M4, trí tuệ nhân tạo (AI) và những yếu tố tạo nên tính "chuyên nghiệp" của iPad.</p>
    <p>Phần thú vị nhất của bài phỏng vấn có lẽ là lời chia sẻ của Joz: "Tôi ngần ngại gọi iPad là 'máy tính bảng' (tablet) bởi vì máy tính bảng thông thường quá 'lởm' (suck). Nhưng iPad thì khác."</p>
    <p><img src='https://st.quantrimang.com/photos/image/2024/05/18/iPad-700.jpg' style="height: 324px; width: 620px;"></p>
    <p>Ông Greg Joswiak.<br>iPad Pro 2024được trang bị chip M4 mới, mang đến màn hình OLED kép.</p>
    <p>John Ternus, Phó chủ tịch cấp cao về Kỹ thuật phần cứng của Apple, cho biết nhờ trang bị M4 mà dòng iPad Pro đã có những cải tiến đáng kể như vượt qua giới hạn về độ mỏng mà không ảnh hưởng đến hiệu năng, thời lượng pin và độ bền cũng không bị ảnh hưởng.</p>
    <p>iPad Pro M4 đi kèm với một loạt phụ kiện mới, bao gồm Magic Keyboard bằng nhôm với các phím chức năng mới, bàn di chuột lớn hơn và Apple Pencil Pro được cải tiến.</p>
    <p><br>Ternus cho biết, họ đã cải thiện cách sạc Apple Pencil Pro bằng cách thiết kế một kiến trúc hoàn toàn mới.Kích thước của giải pháp sạc cảm ứng từ tính đã được giảm xuống một nửa so với phiên bản trước giúp tất cả các thành phần này có thể hoạt động cùng nhau và hoạt động bình thường.</p>
    <p><br>iPad Pro M4 và bàn phím Magic Keyboard và Apple Pencil Pro.<br>Greg Joswiak, Phó chủ tịch cấp cao về Tiếp thị Toàn cầu của Apple, cũng tiết lộ về việc Apple đang "đơn giản hóa dòng sản phẩm Apple Pencil". Tuy nhiên, có thể Apple Pencil và Apple Pencil 2 ban đầu sẽ cần ngừng sản xuất để đạt được mục tiêu này hoàn toàn.</p>
    <p>Cuộc phỏng vấn cũng thảo luận về AI, máy tính Mac và cách Apple định nghĩa một chiếc iPad "chuyên nghiệp". Các lãnh đạo cao cấp của Apple cho biết, Mac và iPad là hai công cụ rất khác nhau. Mặc dù cả hai thiết bị đều có thể thực hiện nhiều tác vụ tương tự nhưng iPad vẫn khác biệt so với Mac ở một số điểm, bao gồm khả năng điều khiển cảm ứng, hỗ trợ bút Apple Pencil và 5G tích hợp. Thực tế,</p>
</div>`,
        "avatar": "https://example.com/avatar.jpg",
        "name": "John Doe",
        "created_at": "2024-05-18T14:30:00Z",
        "category": "Web Development",
        "related_posts": [
            {
                "image": "https://th.bing.com/th/id/R.508047790cf5156b254fb7c9dc76adc4?rik=y4wu1DtuunQuqw&pid=ImgRaw&r=0",
                "title": "Top smartphone phát ra nhiều bức xạ nguy hiểm nhất hiện nay"
            },
            {
                "image": "https://th.bing.com/th/id/OIP.MexzN33zMKEzsBczypu7KAAAAA?w=150&h=67&c=7&r=0&o=5&pid=1.7",
                "title": "Những trang web đen siêu hay không thể tìm thấy trên Google"
            }
        ],
        "reaction": {
            "likes": 120,
            "dislikes": 10
        },
        "rating": 3
    }

    // const post = [blog_post]

    const [loading, setLoading] = useState<boolean>(true);
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        console.log(params);
        fetchBlogDetail(params.id);
    }, [params.id]);

    // if (loading) return <Loader />;

    return (
        <Container maxWidth="lg">
            {blog ?
                <Grid container spacing={5} sx={{ mt: 3 }}>
                    <Main blog={{ title: blog.title, subtitle: blog.shortDescription, avatar: blog.profile.avatar, name: blog.profile.fullName, created_at: blog.createdAt, category: blog.category, reaction: blog.likes ? blog.likes.value : 0, rating: blog_post.rating, id_comment: 0, id_blog: blog.id }} content={[blog.content]}></Main>
                    <Sidebar relatedBlog={blog.relateBlog}></Sidebar>
                </Grid>
                : <></>}
        </Container>
    );
};

export default BlogDetails;
