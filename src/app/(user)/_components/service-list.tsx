"use client";

import Grid from "@mui/material/Grid";
import { ServiceCard, ServiceCardParams } from "components/card/service-card/service-card";
import { FlexCenter } from "components/common/box/flex-box";
import { MainTitle } from "components/common/text/text";

export const ServiceList = () => {
  const serviceList: ServiceCardParams[] = [{
    id: "MockInterviewService",
    image: "/assets/images/illu-1.png",
    title: "Mock Interview",
    rating: 5,
    totalRating: 112,
    useTime: 173,
    price: 375000,
    priceDes: "1 buổi phòng vấn",
  },
  {
    id: "CVService",
    image: "/assets/images/illu-5.png",
    title: "Tạo CV",
    rating: 5,
    totalRating: 168,
    useTime: 106,
    price: 200000,
    priceDes: "1 CV",
  }
  ]
  return (
    <>
      <MainTitle py={10} pt={10} id={"serviceDiv"}>
        Dịch vụ
      </MainTitle>
      <Grid container maxWidth={"100%"}>
        {serviceList.map((service) => (
          <Grid item xs={12} sm={12} key={service.id}>
            <FlexCenter>
              <ServiceCard params={service} />
            </FlexCenter>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
