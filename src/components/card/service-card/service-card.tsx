"use client";

import { Box, CardContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { FlexBetween, FlexBox, FlexCenter } from "components/common/box/flex-box";
import { ContainedButton } from "components/common/button/button";
import { PRIMARYCOLOR } from "components/common/config";
import { ImageCard } from "components/common/image/image-card";
import { Text } from "components/common/text/text";
import { formatNumber } from "package/util";
import { ReactNode } from "react";
import "../service-card/styles.scss";

export interface ServiceCardParams {
  id: string,
  image: string;
  title: string;
  rating: number;
  totalRating: number;
  useTime: number,
  price: number,
  priceDes: string;
}

export const ServiceCard = ({ params }: { params: ServiceCardParams }) => {

  const StyledText = ({ children }: { children: ReactNode }) => {
    return (
      <Text
        color="#04273B"
        fontSize={12.5}
        fontWeight={300}
        sx={{
          ":before": {
            content: `"\u2022"`,
            mr: 1,
          },
        }}
      >
        {children}
      </Text >
    );
  };

  const CVService = () => {
    return (
      <>
        <StyledText>
          Làm CV dựa theo vị trí công việc người dùng đang mong muốn ứng tuyển.
        </StyledText>
        <StyledText>
          Lựa chọn và chắt lọc những thông tin giá trị nhất để đưa vào CV.
        </StyledText>
        <StyledText>
          Đồng thời đưa ra lời khuyên về kiến thức, kỹ năng mà người dùng cần cải
          thiện để CV hoàn thiện và được đánh giá cao trong mắt NTD.
        </StyledText>
      </>
    );
  };


  const MockInterviewService = () => {
    return (
      <>
        <StyledText>
          Dịch vụ phỏng vấn thử {""}
          <span style={{ fontWeight: 700 }}>
            mô phỏng một buổi phỏng vấn thực tế
          </span>
          . Người dùng sẽ được phỏng vấn bởi các chuyên gia nhiều năm trong lĩnh
          vực, là nhà tuyển dụng của các tập đoàn.
        </StyledText >
        <StyledText>
          Buổi phỏng vấn sẽ được {""}
          <span style={{ fontWeight: 700 }}>
            diễn ra trong vòng 1 tiếng 30 phút với 1 tiếng để phỏng vấn và 30p
            dùng cho Q&A và feedback.
          </span>
        </StyledText>
        <StyledText>
          Sau buổi phỏng vấn GotchaJob sẽ đảm bảo ứng viên hiểu rõ được một buổi
          phỏng vấn tương tự sẽ diễn ra như thế nào, hơn thế nữa là nắm bắt được khả năng qua vòng phỏng vấn dựa trên kết quả
          phỏng vấn thử của ứng viên và đánh giá từ phía chuyên gia.
        </StyledText>
      </>
    );
  };

  const ServiceType = (type: any) => {
    switch (type) {
      case "MockInterviewService":
        return MockInterviewService();
      case "CVService":
        return CVService();
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ maxWidth: "80%", py: 1, px: 1 }}>
        <CardContent sx={{
          padding: 0,
          width: "100%",
          paddingTop: 7,
          paddingBottom: 10,
          paddingRight: 12,
          paddingX: {
            xs: 3,
            sm: 12,
          },
          position: "relative",
        }}>
          <Grid container spacing={4}>
            <Grid
              item
              position={"relative"}
              xs={0}
              md={4.5}
              sx={{
                display: {
                  xs: "none",
                  md: "block !important",
                },
              }}
            >
              <FlexCenter position={"relative"} left={-21} height={"100"}>
                <ImageCard src={params.image} width={360} height={320} />
              </FlexCenter>
            </Grid>
            <Grid item xs={12} md={7.5}>
              <Text mb={1} fontSize={45} fontWeight={"700"} color={PRIMARYCOLOR}>
                {params.title}
              </Text>
              <FlexBetween sx={{
                display: {
                  xs: "block",
                  sm: "flex !important",
                },
              }}>
                <Text color="#b7b8b9" fontSize={12}>
                  <span style={{ color: "#49a0d3" }}>{params.useTime} lượt </span> sử dụng dịch
                  vụ
                </Text>
                <FlexBox>
                  <Rating name="read-only" value={params.rating} readOnly size="small" />
                  <Text color="#b7b8b9" fontSize={12} ml={1}>
                    [{params.totalRating}]
                  </Text>
                  <Text
                    color="#49a0d3"
                    sx={{ textDecoration: "underline" }}
                    fontSize={12}
                    ml={2}
                  >
                    Xem đánh giá
                  </Text>
                </FlexBox>
              </FlexBetween>
              <Text my={1} fontSize={20} fontWeight={"700"} color={PRIMARYCOLOR}>
                Mô tả:
              </Text>
              <Stack spacing={1} maxHeight={150}>
                {ServiceType(params.id)}
              </Stack>
              <FlexBox mt={3}
                sx={{
                  display: {
                    xs: "block",
                    700: "flex !important",
                  },
                  justifyContent: {
                    xs: "center",
                    700: "none !important",
                  },
                }}>
                <FlexCenter>
                  <FlexCenter
                    py={3}
                    px={3.5}
                    bgcolor={"#F2FAFF"}
                    boxShadow="0px 6px 12px rgba(21.95, 98.70, 142.38, 0.20)"
                    borderRadius={55}
                    sx={{
                      width: "fit-content",
                      marginRight: {
                        xs: 0,
                        700: "20px !important",
                      },
                      marginBottom: {
                        xs: "20px",
                        700: "0px !important",
                      },
                    }}
                    overflow="hidden"
                  >
                    <Text color="#0E82C4" fontWeight={700} fontSize={20}>
                      {params.price === 0 ? (
                        <span style={{ fontSize: 30 }}>Miễn phí</span>
                      ) : (
                        <>
                          <span style={{
                            fontSize: 25,
                          }}>
                            {formatNumber(params.price)} VND/
                          </span>
                          {params.priceDes}
                        </>
                      )}
                    </Text>
                  </FlexCenter>
                </FlexCenter>
                <FlexCenter>
                  <ContainedButton onClick={() => { }}>
                    {params.price === 0 ? "Trải nghiệm ngay" : "Mua ngay"}
                  </ContainedButton>
                </FlexCenter>
              </FlexBox>
            </Grid>
          </Grid>
        </CardContent>
      </Box >
    </>
  );
};
