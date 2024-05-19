"use client";

import Grid from "@mui/material/Grid";
import { ServiceCard, ServiceCardParams } from "components/card/service-card/service-card-default";
import { FlexCenter } from "components/common/box/flex-box";
import { MainTitle } from "components/common/text/text";
import { CVIcon, MockInterviewIcon, PartnerTrainingIcon, SmartTumIcon } from "components/icon/mock-interview-icon";

export const ServiceList = () => {
  const serviceList: ServiceCardParams[] = [
    {
      icon: <MockInterviewIcon />,
      title: "Mock Interview",
      popupType: "MockInterview",
      description:
        "Được phỏng vấn sát với trường hợp của bản thân, gửi trước công ty & vị trí muốn ứng tuyển, phỏng vấn & nhận được feedback bởi các managers nhiều năm kinh nghiệm.",
    },
    {
      icon: <PartnerTrainingIcon />,
      title: "Trải nghiệm thực tế tại doanh nghiệp",
      popupType: "PartnerTraining",
      description:
        "Được training và làm bài tập thực tế từ công ty, feedback vào ngày cuối cùng, được đi làm thử như 1 nhân viên chính thức.",
    },
    {
      icon: <CVIcon />,
      title: "CV",
      popupType: "CV",
      description:
        "Xây dựng CV giúp làm nổi bật thế mạnh & gây ấn tượng cho nhà tuyển dụng",
    },
    {
      icon: <SmartTumIcon />,
      title: "Smart TUM",
      popupType: "SmartTUM",
      description:
        "Dịch vụ kết nối tự động giữa nhà tuyển dụng và ứng viên dựa vào Mô tả công việc và CV của ứng viên",
    },
  ];
  return (
    <>
      <MainTitle py={10} pt={25} id={"serviceDiv"}>
        Dịch vụ
      </MainTitle>
      <Grid container maxWidth={840}>
        {serviceList.map((service) => (
          <Grid item xs={12} sm={6} key={service.title}>
            <FlexCenter>
              <ServiceCard params={service} />
            </FlexCenter>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
