"use client";

// material-ui
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from "@mui/material/Link";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { FlexBetween } from 'components/common/box/flex-box';
import { StyledLink } from 'components/common/link/styled-link';
import { Text } from 'components/common/text/text';
import { formatDate } from "package/util";
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import Avatar from 'ui-component/extended/Avatar';
import { useGetExpertProfile } from "hooks/use-get-expert-profile";
import { useRefresh } from "hooks/use-refresh";
import { useGetExpertSkillOptions } from "hooks/use-get-expert-skill-option";


export interface EducationData {
  time: string;
  timeDes: string;
  title: string;
  titleDes: string;
}

// ==============================|| PROFILE 1 - PROFILE ||============================== //

const ExpertProfilePage = ({ params }: { params: { id: string } }) => {

  const [openDialog, setOpenDialog] = useState(false);

  const { refresh, refreshTime } = useRefresh();

  const { expert, loading: expertLoading } = useGetExpertProfile({ id: +params.id }, refreshTime);

  const { expertSkillOptions } = useGetExpertSkillOptions({ expertId: +params.id });

  useEffect(() => { console.log("expert", expert) }, [params, expert]);
  
  return (
    <Box sx={{ px: 10, py: 5 }}>
      <Grid
        component={Box}
        container
        spacing={gridSpacing}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          '&:hover': {
            boxShadow: 5,
          },
          py: 2,
          px: 3
        }}
      >
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
                      <Typography variant="h5">Giới thiệu</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">{expert.bio}</Typography>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="h5">Quốc gia hỗ trợ</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        {/* {covertNationString()} */}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="h5">Năm kinh nghiệm</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        {expert.yearExperience} năm
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>

                <Divider sx={{ margin: "16px 0" }} />
                <Grid
                  container
                  spacing={2}
                  sx={{
                    "& >div": {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "block",
                      width: "100%",
                    },
                    "& a": {
                      color: "grey.700",

                      "& svg": {
                        mr: 1,
                        verticalAlign: "bottom",
                      },
                      "&:hover": {
                        color: "primary.main",
                        textDecoration: "none",
                      },
                    },
                  }}
                >
                  <Grid item xs={12}>
                    <Link
                      href="https://www.twitters.com/codedthemes"
                      target="_blank"
                      underline="hover"
                    >
                      <InstagramIcon sx={{ color: "orange.dark" }} />{" "}
                      {expert.twitterUrl}
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      href="https://www.facebook.com/codedthemes"
                      target="_blank"
                      underline="hover"
                    >
                      <FacebookIcon color="primary" /> {expert.facebookUrl}
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      href="https://in.linkedin.com/company/codedthemes"
                      target="_blank"
                      underline="hover"
                    >
                      <LinkedInIcon sx={{ color: "grey.900" }} />{" "}
                      {expert.linkedinUrl}
                    </Link>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>

            <Grid item lg={8} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <SubCard title="Thông tin cá nhân">
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

                <Grid item xs={12}>
                  <SubCard title="Thời gian">
                    <Grid container spacing={1}>
                      {expert.education !== undefined &&
                        JSON.parse(expert.education).map(
                          (row: EducationData, index: number) => (
                            <Grid item xs={12} key={index}>
                              <Grid container>
                                <Grid item xs={12} sm={4}>
                                  <Typography variant="subtitle1">
                                    {row.time}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {row.timeDes}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                  <Typography variant="subtitle1">
                                    {row.title}
                                  </Typography>
                                  <Typography variant="subtitle2">
                                    {row.titleDes}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          )
                        )}
                    </Grid>
                  </SubCard>
                </Grid>
              </Grid>
            </Grid>

            {expertSkillOptions?.map((skillOptions, index) => (<> <Grid item xs={4}>
              <SubCard title={skillOptions.skillOptionName} key={index}>
                <FlexBetween>
                  <Rating value={skillOptions.sumPoint} size="small" readOnly />
                  <Text fontSize={13}>
                    <span style={{ fontWeight: "bold" }}>{skillOptions.totalRating}</span> lượt đánh giá
                  </Text>
                </FlexBetween>
              </SubCard>
            </Grid></>))}

            <Grid item xs={12} mt={1}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <StyledLink href="/share-cv">
                    <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                      Quay lại
                    </Button>
                  </StyledLink>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={() => setOpenDialog(true)}>Đặt lịch</Button>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}

        {/* Dialog xác nhận chọn chuyên gia */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <DialogTitle>Xác nhận chọn chuyên gia</DialogTitle>
          <DialogContent>
            <DialogContentText >
              Bạn muốn đặt lịch phỏng vấn CV với chuyên gia {expert?.firstName} {expert?.lastName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Đóng
            </Button>
            <StyledLink href={`/booking-interview-cv/${params.id}`}>
              <Button color="primary" autoFocus>
                Đồng ý
              </Button>
            </StyledLink>
          </DialogActions>
        </Dialog>

      </Grid>
    </Box>
  );
};

export default ExpertProfilePage;