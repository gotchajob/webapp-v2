"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ServiceCard, ServiceCardParams } from "components/card/service-card/service-card";
import { FlexCenter } from "components/common/box/flex-box";


const url = "https://info.practicelink.com/hubfs/July%20Week%201%20-%20How%20to%20review%20a%20CV.png#keepProtocol";

const url2 = ''

const data = [
    {
        title: "6s",
        content: "là thời gian nhà tuyển dụng Scan CV và chỉ có 20% ứng viên được gọi phỏng vấn."
    },
    {
        title: "50%",
        content: "sinh viên vừa tốt nghiệp đánh mất cơ hội có được công việc mơ ước vì mắc lỗi viết CV."
    },
    {
        title: "50%",
        content: "sinh viên vừa tốt nghiệp loay hoay với lộ trình thăng tiến của bản thân."
    }
];

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
]

const ReviewCVPage = () => {
    return (<>
        <Box sx={{
            width: "100%",
            height: "650px",
            position: "relative",
            zIndex: 1,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(/assets/images/upload/reviewCV.png)`,
            backgroundSize: "100% 100%",
        }}>
            <Stack
                spacing={3}
                sx={{
                    position: 'absolute',
                    zIndex: 2,
                    paddingTop: 10,
                    paddingLeft: 5
                }}
            >
                <Typography sx={{
                    color: '#F3F5F7',
                    fontWeight: 700,
                    fontSize: "45px",
                    fontFamily: "Inter, sans-serif",
                }}>
                    Dịch vụ <span style={{ color: '#00CCFF' }}>Tư vấn CV</span> <br /> và <span style={{ color: '#00CCFF' }}>Định hướng tìm việc</span>
                </Typography>
                <Typography sx={{
                    color: '#F3F5F7',
                    fontSize: "18px",
                    fontFamily: "Inter, sans-serif",
                }}>
                    Giải pháp giúp bạn chinh phục cơ hội việc làm mơ ước <br /> và xây dựng lộ trình nghề nghiệp tương lai.
                </Typography>
                <Typography sx={{
                    color: '#F3F5F7',
                    fontSize: "18px",
                    fontFamily: "Inter, sans-serif",
                }}>
                    Chinh phục nhà tuyển dụng từ vòng gửi xe.
                </Typography>
                <Stack direction={"row"} spacing={2}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#00CCFF',
                            color: '#fff',
                            fontSize: "16px",
                            padding: "6px 18px",
                        }}
                    >
                        Đăng ký ngay
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#FFFFFF',
                            color: '#FFFFFF',
                            fontSize: "16px",
                            padding: "6px 18px",
                            '&:hover': {
                                color: '#00CCFF',
                                borderColor: '#FFFFFF'
                            }
                        }}
                    >
                        Tìm hiểu thêm
                    </Button>
                </Stack>
            </Stack>
        </Box >
        <Box py={9} px={20}>
            <Box sx={{
                width: '100%',
                height: '500px',
                position: "relative",
                zIndex: 1,
                borderRadius: 2,
                backgroundImage: 'linear-gradient(to right bottom, #AAD4EB, #00CCFF, #0980C3)',
                textAlign: "center",
            }}>
                <Stack spacing={5}
                    sx={{
                        width: "100%",
                        position: 'absolute',
                        zIndex: 2,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}>
                    <Typography
                        sx={{
                            color: '#F3F5F7',
                            fontWeight: 700,
                            fontSize: "28px",
                            fontFamily: "Inter, sans-serif",
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        Những con số biết nói
                    </Typography>
                    <Stack direction="row" spacing={4} justifyContent="center">
                        {data.map((item, index) => (
                            <Box key={index} sx={{
                                width: '300px',
                                height: "200px",
                                backgroundColor: "#FFFFFF",
                                padding: 2,
                                borderRadius: 2,
                                display: "flex",
                                flexDirection: "column",
                                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                            }}>
                                <Typography sx={{
                                    backgroundImage: 'linear-gradient(to right bottom, #AAD4EB, #00CCFF, #0980C3)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    fontWeight: 700,
                                    fontSize: "32px",
                                    fontFamily: "Inter, sans-serif",
                                    textAlign: "center",
                                    margin: 2,
                                }}>
                                    {item.title}
                                </Typography>
                                <Typography sx={{
                                    fontSize: "16px",
                                    fontFamily: "Inter, sans-serif",
                                    textAlign: "center",
                                    lineHeight: 1.6,
                                }}>
                                    {item.content}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                    <Stack pt={1} spacing={1}>
                        <Typography sx={{
                            color: '#F3F5F7',
                            fontSize: "18px",
                            fontFamily: "Inter, sans-serif",
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        }}>
                            Bạn có thể thử, có thể sai, nhưng đừng mãi phí hoài thời gian, đánh mất cơ hội
                        </Typography>
                        <Typography sx={{
                            color: '#F3F5F7',
                            fontWeight: 700,
                            fontSize: "18px",
                            fontFamily: "Inter, sans-serif",
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                        }}>
                            Đi đúng hướng cùng GotchaJob ngay hôm nay!
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
            <Box py={6} px={30}>
                <Typography sx={{
                    fontWeight: 700,
                    fontSize: "28px",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.05em",
                    textAlign: "center",
                }}>
                    Lựa chọn <span style={{ color: '#00CCFF' }}>giải pháp</span> phù hợp <span style={{ color: '#00CCFF' }}>dành cho bạn</span>
                </Typography>
            </Box>
            <Grid container maxWidth={"100%"} sx={{ transform: "scale(1.4)" }}>
                {serviceList.map((service) => (
                    <Grid item xs={12} sm={12} key={service.id}>
                        <FlexCenter>
                            <ServiceCard params={service} />
                        </FlexCenter>
                    </Grid>
                ))}
            </Grid>
        </Box>
    </>);
}

export default ReviewCVPage;