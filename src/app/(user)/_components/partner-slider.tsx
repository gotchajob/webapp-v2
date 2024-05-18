"use client";

import Box from "@mui/material/Box";
import { FlexCenter } from "components/common/box/flex-box";
import { ImageCard } from "components/common/image/image-card";
import useWindowSize from "hooks/use-window-size";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "../../../scss/carousel.scss";
import { SubTitle } from "components/common/text/text";

export const PartnerCarousel = () => {
  const clientWidth = useWindowSize();
  const [partnerNumber, setPartnerNumber] = useState(5);
  useEffect(() => {
    if (clientWidth > 700) {
      setPartnerNumber(5);
    } else {
      setPartnerNumber(Math.floor(clientWidth / 140));
    }
  }, [clientWidth]);
  const responsive = {
    140: {
      items: 1,
    },
    280: {
      items: 2,
    },
    420: {
      items: 3,
    },
    560: {
      items: 4,
    },
    700: {
      items: 5,
    },
  };

  const items = listPartner.map((partner) => {
    return (
      <FlexCenter
        key={partner.name}
        data-value="1"
        sx={{
          width: "140px",
          paddingLeft: "40px",
          paddingRight: "40px",
          height: "60px !important",
          opacity: 0.6,
          ":hover": {
            opacity: 1,
          },
        }}
      >
        <ImageCard src={partner.logo} width={80} />
      </FlexCenter>
    );
  });
  return (
    <>
      <SubTitle pt={15} pb={3}>
        Đối tác của chúng tôi
      </SubTitle>
      <Box width={partnerNumber * 140}>
        <AliceCarousel
          innerWidth={partnerNumber * 140}
          activeIndex={0}
          animationDuration={1000}
          autoPlay
          autoPlayInterval={2000}
          disableButtonsControls
          mouseTracking
          items={items}
          responsive={responsive}
        />
      </Box>
    </>
  );
};

const listPartner = [
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-1.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-2.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-3.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-4.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-5.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-6.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-7.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-8.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-9.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-10.png",
  },
  {
    name: "Đại học quốc gia",
    logo: "/assets/images/partner-11.png",
  },
];
