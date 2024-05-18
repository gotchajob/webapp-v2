"use client";

import Box from "@mui/material/Box";
import { MentorCard, MentorCardProps, MentorNextButton } from "components/card/mentor-card/mentor-card";
import { MainTitle } from "components/common/text/text";
import useWindowSize from "hooks/use-window-size";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "../../../scss/carousel.scss";

export const MentorList = () => {
  const clientWidth = useWindowSize();
  const [mentorNumber, setMentorNumber] = useState(3);
  useEffect(() => {
    if (clientWidth > 1024) {
      setMentorNumber(3);
    } else {
      let newNumber = Math.floor((clientWidth - 100) / 308);
      if (newNumber < 1) {
        newNumber = 1;
      }
      setMentorNumber(newNumber);
    }
  }, [clientWidth]);
  const listMentor: MentorCardProps[] = [
    {
      image: "/assets/images/mentor-1.png",
      title: "Trần Nguyễn Phi Long",
      subtitle: "Head of Retail Marketing tại PNJ",
      description:
        "Anh Phi Long với hơn 12 năm kinh nghiệm trong ngành, từng giữ vị trí quản lý cấp cao và lãnh đạo marketing của nhiều công ty, tổ chức hàng đầu Việt Nam cũng như các tập đoàn quốc tế hàng đầu thế giới như Central Group, Lazada, Nhóm Mua, Pharmacity & PNJ.",
    },
    {
      image: "/assets/images/mentor-2.png",
      title: "Trần Duy Cảnh",
      subtitle: "Senior Data Engineer tại Grab Singapore",
      description:
        "Anh Calvin Cảnh Trần với hơn 10 năm kinh nghiệm trong ngành Công nghệ thông tin ở vị trí Data Engineer tại các tập đoàn có tiếng như Yokogawa, honestbee và hiện tại là Grab Singapore.",
    },
    {
      image: "/assets/images/mentor-3.png",
      title: "Alice Mai",
      subtitle: "Founder & CEO tại Maven Group",
      description:
        "Chị Alice Mai từng học MBA - Master of Business and Administration, Data Analytics and Entrepreneurship tại McMaster University. Chị từng giữ vị trí Brand Manager, Category Manager tại McMaster, Lazada Vietnam, Calvin Klein và nhiều công ty, tập đoàn lớn khác.",
    },
    {
      image: "/assets/images/mentor-4.png",
      title: "Nguyễn Minh Tuấn",
      subtitle: "Assistant L&D Manager tại DHL Supply Chain Vietnam",
      description:
        "Anh Tuấn có gần 6 năm trong lĩnh vực supply chain và hiện anh đang công tác tại tập đoàn đa quốc gia DHL. Ngoài ra anh còn từng làm việc tại các khách sạn Hotel Nikko Saigon, InterContinental Asiana Saigon, AccorHotels, ...",
    },
    {
      image: "/assets/images/mentor-5.png",
      title: "Trần Thị Trang",
      subtitle: "Recruitment & Employer Branding Manager tại Shopee",
      description:
        "Sau khi tốt nghiệp Đại học Ngoại Thương, chị Trang làm việc tại Nhật Bản hơn 2 năm trước khi trở lại Việt Nam. Chị có hơn 10 năm kinh nghiệm trong lĩnh vực Tuyển Dụng và Nhân Sự tại thị trường Châu Á trong các tập đoàn toàn cầu như Navigos Group, UNIQLO và hiện tại là ở Shopee.",
    },
    {
      image: "/assets/images/mentor-6.png",
      title: "Phong Dương",
      subtitle: "Data Manager tại M3TA's, Co-Founder & CCO tại Financial",
      description:
        "Anh Phong Dương (Patrick Dương), là một người có tính cách phóng khoáng, năng động, dễ dàng hòa nhập với môi trường.Anh có kinh nghiệm trong các lĩnh vực về tài chính, kinh doanh và hiện nay đang chuyển hướng sang công nghệ.",
    },
    {
      image: "/assets/images/mentor-7.png",
      title: "Nguyễn Ánh Dương",
      subtitle: "Financial Specialist tại AIA Việt Nam",
      description:
        "Kinh nghiệm hơn 5 năm làm việc của chị: 2015 - 2016: Tình nguyện viên Trợ lý Dự án tại CSIP, 2018 - 2019: Cộng tác viên Kiểm toán tại Deloitte Việt Nam, 2019: Internal Auditor cho khu vực Châu Á Thái Bình Dương tại Robert Bosch Engineering & Business Solutions, 2019 - nay: Finance Business Partner (Mảng Sales và Marketing) tại AIA Việt Nam.",
    },
    {
      image: "/assets/images/mentor-8.png",
      title: "Lê Bá Ngọc",
      subtitle: "Head of Retail & E-commerce tại Tập đoàn Greenfeed",
      description:
        "Anh Lê Bá Ngọc hiện đang là Head of Retail & E-commerce tại GREENFEED Group. Anh phụ trách mảng Marketing với vị trí Marketing Manager. Anh Bá Ngọc cũng từng đảm nhiệm nhiều vị trí quan trọng trong nhiều tập đoàn lớn như Brand Manager của Masan Group; Senior Assistant Brand Manager của Asia Foods hay Assistant Brand Manager của Mondelez Kinh Do Vietnam.",
    },
    {
      image: "/assets/images/mentor-9.png",
      title: "Dương My",
      subtitle: "Product & Channel Marketing tại Sun Life Việt Nam",
      description:
        "Chị hiện có hơn 10 năm trong ngành, từng làm việc tại các công ty như Path, BGS Global, Manulife, Chubb, Hafele vietnam.",
    },
  ];
  const responsive = {
    308: {
      items: 1,
    },
    616: {
      items: 2,
    },
    924: {
      items: 3,
    },
  };

  const items = listMentor.map((mentor) => {
    return <MentorCard props={mentor} key={mentor.title} />;
  });
  return (
    <>
      <MainTitle py={10} pt={30} id={"mentorDiv"}>
        Đội ngũ chuyên môn
      </MainTitle>
      <Box
        width={mentorNumber * 308 + 100}
        paddingX={"50px"}
        position={"relative"}
      >
        <AliceCarousel
          innerWidth={mentorNumber * 308}
          activeIndex={0}
          animationDuration={1000}
          preservePosition
          renderNextButton={({ isDisabled }) => (
            <MentorNextButton disabled={isDisabled as boolean} isNext={true} />
          )}
          renderPrevButton={({ isDisabled }) => (
            <MentorNextButton disabled={isDisabled as boolean} isNext={false} />
          )}
          mouseTracking
          items={items}
          responsive={responsive}
        />
      </Box>
    </>
  );
};
