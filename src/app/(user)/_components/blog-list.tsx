"use client";

import { BlogCard, BlogCardProps } from "components/card/blog-card/blog-card";
import { FlexBox } from "components/common/box/flex-box";
import { MainTitle } from "components/common/text/text";
import useWindowSize from "hooks/use-window-size";
import { useEffect, useState } from "react";

export const BlogList = () => {
  const clientWidth = useWindowSize();
  const [numberOfBlog, setNumberOfBlog] = useState(4);
  useEffect(() => {
    if (clientWidth >= 1232) {
      setNumberOfBlog(4);
    }
    else {
      setNumberOfBlog(Math.floor(clientWidth / 308))
    }
  }, [clientWidth]);

  const blogList: BlogCardProps[] = [
    {
      author: "Tuấn Trần",
      image: "/assets/images/blog-1.png",
      description: "Trong những website tuyển dụng uy tín Top 1 là...",
      time: "2023, 3 tháng 5",
      title: "Top những website tuyển dụng uy tín",
    },
    {
      author: "Tuấn Trần",
      image: "/assets/images/blog-2.png",
      description:
        "Để phỏng vấn thành công, trước hết là chúng ta nên chuẩn bị sẵn sàng cho...",
      time: "2023, 2 tháng 4",
      title: "Top những tips để chuẩn bị cho phỏng vấn",
    },
    {
      author: "Tuấn Trần",
      image: "/assets/images/blog-3.png",
      description:
        "Work from home hay còn được gọi là làm việc tại nhà, làm việc online, hiện nay...",
      time: "2023, 29 tháng 2",
      title: "Cách để tối đa công suất khi làm việc ở nhà",
    },
    {
      author: "Tuấn Trần",
      image: "/assets/images/blog-4.png",
      description:
        "Bạn muốn xin việc và được trả lời ngay lập tức, bạn muốn một CV mà ai nhìn...",
      time: "2023, 30 tháng 4",
      title: "Những sơ yếu lí lịch chuẩn cập nhật mới nhất 2023",
    },
  ];
  
  return (
    <>
      <MainTitle py={10} pt={25} id={"blogDiv"}>
        Blog
      </MainTitle>
      <a href={"/blog"} style={{ textDecoration: 'none', color: 'inherit' }}>
        <FlexBox>
          {blogList.slice(0, numberOfBlog).map((blog) => (
            <BlogCard props={blog} key={blog.title} />
          ))}
        </FlexBox >
      </a>
    </>
  );
};
