import ArrowRight from "@mui/icons-material/ArrowRight";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { FlexBox } from "components/common/box/flex-box";
import { ImageCard } from "components/common/image/image-card";
import { Text } from "components/common/text/text";
import { ReactNode } from "react";
import { SubscribeForm } from "./subscribe-form";

export const Footer = () => {
  return (
    <>
      <Box bgcolor={"#031a27"} height={280} mt={12} pt={4} width={"100%"}>
        <Grid
          container
          sx={{
            maxWidth: "1232px",
            margin: "auto",
          }}
          spacing={1}
          px={2}
        >
          <Grid
            item
            sm={4}
            lg={3}
            sx={{
              display: {
                xs: "none",
                sm: "block !important",
              },
            }}
          >
            <Text color="white" fontSize={25} fontWeight="700" mb={2}>
              GJ
            </Text>
            <Stack spacing={3}>
              <Text fontSize={11} color={"white"} fontWeight={100}>
                Vinhomes Grand Park <br /> P.Long Thạnh Mỹ, Quận 9, Tp.HCM
              </Text>
              <Box>
                <Text fontSize={11} color={"white"} fontWeight={100}>
                  <span style={{ fontWeight: "500" }}>SĐT: </span>+84 0941 244
                  285
                </Text>
                <Text fontSize={11} color={"white"} fontWeight={100}>
                  <span style={{ fontWeight: "500" }}>Email: </span>
                  gotchajob.vn@gmail.com 285
                </Text>
              </Box>
              <ImageCard width={25} src="/assets/icon/facebook-icon.png" />
            </Stack>
          </Grid>
          <Grid item xs={6} sm={4} lg={2.5}>
            <Title>Về GotchaJob</Title>
            <Stack spacing={0.5}>
              <AboutItem title="Trang chủ" />
              <AboutItem title="Về chúng tôi" />
              <AboutItem title="Giá cả" />
              <AboutItem title="Term of service" />
              <AboutItem title="Privacy policy" />
            </Stack>
          </Grid>
          <Grid item xs={6} sm={4} lg={3}>
            <Title>Các dịch vụ</Title>
            <Stack spacing={0.5}>
              <AboutItem title="Chỉnh & sửa CV" />
              <AboutItem title="Mentoring" />
              <AboutItem title="Workshop & Seminar" />
              <AboutItem title="Mock Interview" />
              <AboutItem title="Tham quan công ty" />
            </Stack>
          </Grid>
          <Grid
            item
            lg={3.5}
            sx={{
              display: {
                xs: "none",
                lg: "block !important",
              },
            }}
          >
            <Title>Tin tức mới</Title>
            <SubscribeForm />
          </Grid>
        </Grid>
      </Box>
      <Box bgcolor={"#010d14"} height={20}></Box>
    </>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <Text color="white" fontSize={18} fontWeight="700" mb={2}>
      {children}
    </Text>
  );
};
const AboutItem = ({ title }: { title: string }) => {
  return (
    <FlexBox>
      <ArrowRight color="primary" />
      <Text ml={1} fontSize={15} color={"white"} fontWeight={100}>
        {title}
      </Text>
    </FlexBox>
  );
};
