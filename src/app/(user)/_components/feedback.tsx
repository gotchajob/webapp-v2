"use client";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { FlexCenter } from "components/common/box/flex-box";
import { ImageCard } from "components/common/image/image-card";
import { Text } from "components/common/text/text";
import useWindowSize from "hooks/use-window-size";
import { useEffect, useState } from "react";

export const Feedback = () => {
  const [feedbackHeight, setFeedbackHeight] = useState(753.36);


  let clientWidth = useWindowSize();

  useEffect(() => {
    if (document !== null) {
      const feedbackHeight =
        document.getElementById("imageFeedbackId")?.clientHeight || 753.36;
      setFeedbackHeight(feedbackHeight);
    }
  }, [clientWidth]);

  return (
    <Box position={"relative"} height={feedbackHeight} mt={25} sx={{
      display: feedbackHeight < 300 ? "none !important" : "block !important"
    }}>
      <Box position={"absolute"} width={"100%"} zIndex={0}>
        <ImageCard
          src="/assets/images/feedback.png"
          id={"imageFeedbackId"}
          height={"450px"}
        />
      </Box>
      <FlexCenter
        position="absolute"
        sx={{
          zIndex: 1,
          width: "100%",
          height: feedbackHeight,
          backgroundColor: "#010D14A6",
        }}
      >
        <Stack spacing={2}>
          <Text
            textAlign={"center"}
            fontSize={28}
            color={"white"}
            fontWeight={"900"}
          >
            Khách hàng nói gì về Gotcha Job?
          </Text>
          <FlexCenter>
            {/* <ImageCard
              src="/assets/images/user-image.png"
              sx={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            /> */}
            <Box
              component="img"
              src="/assets/images/user-image.png"
              sx={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
          </FlexCenter>
          <Box>
            <Text
              textAlign={"center"}
              fontSize={15}
              color={"white"}
              fontWeight={"600"}
            >
              Phạm Huỳnh Đức
            </Text>
            <Text
              textAlign={"center"}
              fontSize={13}
              color={"white"}
              fontWeight={"100"}
            >
              Sinh viên ngành Đồ họa 3D
            </Text>
          </Box>
          <FlexCenter>
            <Rating name="read-only" value={5} readOnly size="small" />
          </FlexCenter>
          <Text
            textAlign={"center"}
            fontSize={13}
            color={"white"}
            fontWeight={"300"}
            maxWidth={800}
            fontStyle={"italic"}
          >
            Dịch vụ thuê mentor để hỗ trợ làm đồ án bên GotchaJob thật sự rất
            hữu ích và tiết kiệm thời gian cũng như công sức của mình. Giá cả
            thuê mentor cũng tương đối phù hợp với túi tiền của mình, anh/chị hỗ
            trợ cũng rất thân thiện, giúp mình tận tình. Mình chắc chắn sẽ sử
            dụng dịch vụ khi có những dự án riêng hoặc khi mình tham gia cuộc
            thi học thuật.
          </Text>
          <FlexCenter>
            <ImageCard src="/assets/images/paging.png" width={50} />
          </FlexCenter>
        </Stack>
      </FlexCenter>
    </Box>
  );
};
