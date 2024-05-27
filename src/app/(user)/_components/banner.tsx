"use client";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FlexCenter } from "components/common/box/flex-box";
import { ContainedButton, OutlinedIconButton } from "components/common/button/button";
import { ImageCard } from "components/common/image/image-card";
import { Text } from "components/common/text/text";
import useWindowSize from "hooks/use-window-size";
import { useEffect, useState } from "react";

export const Banner = () => {
  const [bannerHeight, setBannerHeight] = useState(753.36);
  const [update, setUpdate] = useState(0)
  const clientWidth = useWindowSize();
  useEffect(() => {
    if (document !== null) {
      const bannerHeight =
        document.getElementById("imageBannerId")?.clientHeight;
      //@ts-ignore
      setBannerHeight(bannerHeight);
    }
    if (update === 0) {
      setUpdate(1)
    }
  }, [clientWidth, update]);
  return (
    <Box position={"relative"} height={bannerHeight} sx={{
      display: bannerHeight < 250 ? "none !important" : "block !important"
    }}>
      <Box position={"absolute"} width={"100%"} zIndex={0} >
        <ImageCard src="/assets/images/banner.png" id={"imageBannerId"} />
      </Box>
      <FlexCenter
        position="absolute"
        sx={{
          zIndex: 1,
          width: "100%",
          height: bannerHeight,
          backgroundColor: "#010D14A6",
        }}
      >
        <Stack spacing={5}>
          <Box>
            <Text
              color={"#FBFDFF"}
              textAlign={"center"}
              fontWeight={"bold"}
              fontSize={45}
            >
              GotchaJob
            </Text>
            <Text color={"#FBFDFF"} textAlign={"center"} fontWeight={"bold"}>
              Nền tảng website & app cung cấp các dịch vụ cải thiện kỹ năng
              người dùng trong quá trình họ tham gia ứng tuyển công việc
            </Text>
          </Box>
          <FlexCenter flexDirection={"row"}>
            <ContainedButton sx={{ mr: 3 }}>Bắt đầu</ContainedButton>
            <OutlinedIconButton >
              <PlayArrowIcon />
            </OutlinedIconButton>
          </FlexCenter>
        </Stack>
      </FlexCenter>
    </Box>
  );
};
