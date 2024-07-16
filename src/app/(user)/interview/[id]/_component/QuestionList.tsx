"use client";
// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import { format } from 'date-fns';

// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// types
import { ThemeMode } from 'types/config';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, Rating, TextField } from '@mui/material';
import { StyledLink } from 'components/common/link/styled-link';
import Image from 'next/image';

const formatDate = (isoString: any) => {
    return format(new Date(isoString), 'HH:mm dd/MM/yyyy');
};

const QuestionListPage = () => {

    return (
        <SubCard>
            <Grid container spacing={gridSpacing} px={5}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography variant="body2">
                                        Danh sách câu hỏi buổi phỏng vấn :
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Thông tin khách hàng</Typography>
                                        <Stack spacing={0}>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Tên khách hàng :</Typography>
                                                <Typography variant="body2">Anshan Handgun</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Email :</Typography>
                                                <Typography variant="body2">anshan.handgun@example.com</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Buổi phỏng vấn</Typography>
                                        <Stack spacing={0}>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Kỹ năng khách hàng chọn phỏng vấn :</Typography>
                                                <Typography variant="body2">ReactJS, NodeJS</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={0} sx={{ mt: { xs: 0, md: 3 } }}>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Trạng thái :</Typography>
                                            <Chip label="Đã đặt lịch" variant="outlined" size="small" chipcolor='warning'
                                            />
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4">Câu hỏi phỏng vấn</Typography>
                            <Grid container spacing={2} sx={{ mt: 1 }}>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1">1. Vui lòng mô tả kinh nghiệm làm việc với ReactJS:</Typography>
                                        <TextField fullWidth variant="outlined" multiline rows={2} placeholder="Nhập câu trả lời của bạn" />
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1">2. Bạn đã làm việc với NodeJS bao nhiêu năm?</Typography>
                                        <TextField fullWidth variant="outlined" type="number" placeholder="Nhập số năm kinh nghiệm" />
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle1">3. Đánh giá kỹ năng ReactJS của bạn từ 1 đến 5:</Typography>
                                        <Rating name="rating" defaultValue={0} size="large" />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
};

export default QuestionListPage;
