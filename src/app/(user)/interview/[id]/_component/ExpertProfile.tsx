"use client";

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';


// project imports
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { formatDate } from "package/util";
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Stack } from '@mui/material';
import Link from "@mui/material/Link";
import { FlexBetween } from 'components/common/box/flex-box';
import { StyledLink } from 'components/common/link/styled-link';
import { Text } from 'components/common/text/text';
import { useState } from 'react';
import Image from 'next/image';

export interface EducationData {
    time: string;
    timeDes: string;
    title: string;
    titleDes: string;
}

const expert = {
    userId: 66,
    expertId: 31,
    userStatus: 1,
    email: "kiet111@gmail.com",
    avatar: "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
    firstName: "Lý",
    lastName: "Kiệt",
    address: "854/1, Xã Bản Mế, Huyện Si Ma Cai, Thành phố Hà Nội",
    phone: "0898124853",
    yearExperience: 10,
    birthDate: "2024-06-02T00:00:00.000+00:00",
    bio: "lần đầu gửi đơn đăng kí",
    emailContact: "kietly456@gmail.com",
    portfolioUrl: "",
    facebookUrl: "https://www.facebook.com/",
    twitterUrl: "https://www.twitter.com/",
    linkedinUrl: "https://www.linkedin.com/",
    education: "[{\"time\":\"2014-2017\",\"timeDes\":\"Senior UI/UX designer\",\"title\":\"Master Degree in Computer Application\",\"titleDes\":\"University of Oxford, England\"}]"
};

// ==============================|| PROFILE 1 - PROFILE ||============================== //

const CustomerProfilePage = () => {

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Grid container spacing={gridSpacing}>
            {expert ? (
                <>
                    <Grid item lg={4} xs={12}>
                        <SubCard
                            title={
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar alt="User 1" src={expert?.avatar} />
                                    </Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Typography variant="subtitle1">
                                            {expert.firstName} {expert.lastName}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            }
                        >
                            <Stack spacing={2}>
                                <Grid container item xs={12} spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5">Quốc gia đã chọn</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body2">
                                            Vietnam
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid container item xs={12} spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5">Kỹ năng đã chọn</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction="row" spacing={1}>
                                            <Chip label="ReactJs" color="primary" variant="outlined" />
                                            <Chip label="NodeJs" color="primary" variant="outlined" />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </SubCard>
                        <Box mt={2}>
                            <SubCard title="CV khách hàng">
                                <Stack onClick={() => { setOpenDialog(true) }} sx={{ cursor: 'pointer' }}>
                                    <Image
                                        src="https://marketplace.canva.com/EAFcO7DTEHM/1/0/1131w/canva-blue-professional-modern-cv-resume-pPAKwLoiobE.jpg"
                                        alt="Customer CV"
                                        layout="responsive"
                                        width={700}
                                        height={1000}
                                        objectFit="cover"
                                        objectPosition="top"
                                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Stack>
                            </SubCard>
                            <Dialog open={openDialog} onClose={() => { setOpenDialog(false) }} fullWidth>
                                <DialogContent>
                                    <Image
                                        src="https://marketplace.canva.com/EAFcO7DTEHM/1/0/1131w/canva-blue-professional-modern-cv-resume-pPAKwLoiobE.jpg"
                                        alt="Customer CV"
                                        layout="intrinsic"
                                        width={700}
                                        height={1000}
                                        objectFit="cover"
                                        objectPosition="top"
                                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </DialogContent>
                            </Dialog>
                        </Box>
                    </Grid>
                    <Grid item lg={8} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <SubCard title="Thông tin cá nhân khách hàng">
                                    <Grid container spacing={2}>
                                        <Divider sx={{ pt: 1 }} />
                                        <Grid item xs={12}>
                                            <TableContainer>
                                                <Table
                                                    sx={{
                                                        "& td": {
                                                            borderBottom: "none",
                                                        },
                                                    }}
                                                    size="small"
                                                >
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell variant="head">Địa chỉ</TableCell>
                                                            <TableCell>:</TableCell>
                                                            <TableCell> {expert.address}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell variant="head" sx={{ minWidth: 150 }}>
                                                                Ngày sinh
                                                            </TableCell>
                                                            <TableCell>:</TableCell>
                                                            <TableCell>
                                                                {" "}
                                                                {formatDate(expert.birthDate, "dd/MM/yyyy")}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell variant="head">Liên lạc</TableCell>
                                                            <TableCell>:</TableCell>
                                                            <TableCell> {expert.phone}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell variant="head">Email</TableCell>
                                                            <TableCell>:</TableCell>
                                                            <TableCell> {expert.email}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            ) : (
                <Typography variant="h6">Loading...</Typography>
            )
            }
        </Grid >
    );
};

export default CustomerProfilePage;

{/* <Grid item xs={4}>
                        <SubCard title={"Kĩ năng 1"}>
                            <FlexBetween>
                                <Rating value={5} size="small" readOnly />
                                <Text fontSize={13}>
                                    <span style={{ fontWeight: "bold" }}>175</span> lượt đánh giá
                                </Text>
                            </FlexBetween>
                        </SubCard>
                    </Grid>
                    <Grid item xs={4}>
                        <SubCard title={"Kĩ năng 1"}>
                            <FlexBetween>
                                <Rating value={5} size="small" readOnly />
                                <Text fontSize={13}>
                                    <span style={{ fontWeight: "bold" }}>175</span> lượt đánh giá
                                </Text>
                            </FlexBetween>
                        </SubCard>
                    </Grid>
                    <Grid item xs={4}>
                        <SubCard title={"Kĩ năng 1"}>
                            <FlexBetween>
                                <Rating value={5} size="small" readOnly />
                                <Text fontSize={13}>
                                    <span style={{ fontWeight: "bold" }}>175</span> lượt đánh giá
                                </Text>
                            </FlexBetween>
                        </SubCard>
                    </Grid> */}


{/* <Dialog
open={openDialog}
onClose={() => setOpenDialog(false)}
>
<DialogTitle>Xác nhận chọn chuyên gia</DialogTitle>
<DialogContent>
    <DialogContentText >
        Bạn muốn đặt lịch phỏng vấn CV với chuyên gia Anshan Handgun?
    </DialogContentText>
</DialogContent>
<DialogActions>
    <Button onClick={() => setOpenDialog(false)} color="primary">
        Đóng
    </Button>
    <StyledLink href="/booking-interview-cv/1">
        <Button color="primary" autoFocus>
            Đồng ý
        </Button>
    </StyledLink>
</DialogActions>
</Dialog> */}