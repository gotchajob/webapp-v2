"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { StyledCard } from "components/common/card/card";
import { PRIMARYCOLOR } from "components/common/config";
import { ImageCard } from "components/common/image/image-card";
import { Text, maxLineStyle } from "components/common/text/text";
import Image from "next/image";
import "../mentor-card/styled.scss";
export interface MentorCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const MentorCard = ({ props }: { props: MentorCardProps }) => {
  return (
    <StyledCard
      className="mentor-card"
      sx={{
        height: "430px",
        margin: "15px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ImageCard src={props.image} height={"100%"} />
      <Stack paddingX={3} paddingY={2}>
        <Text style={maxLineStyle(2)} color={PRIMARYCOLOR} fontWeight={700}>
          {props.title}
        </Text>
        <Text fontSize={10}>{props.subtitle}</Text>
        <Box className="mentor-card-navigation">
          <Text style={maxLineStyle(8)} fontSize={10}>
            {props.description}
          </Text>
        </Box>
      </Stack>
    </StyledCard>
  );
};

export const MentorNextButton = ({
  isNext,
  disabled,
}: {
  isNext: boolean;
  disabled: boolean;
}) => {
  return (
    <Image
      alt="none"
      src={"/assets/icon/icon.png"}
      width={1920}
      height={1920}
      style={{
        visibility: disabled ? "hidden" : "visible",
        transform: isNext ? "none" : "rotate(180deg)",
        width: "50px",
        height: "50px",
      }}
    />
  );
};
