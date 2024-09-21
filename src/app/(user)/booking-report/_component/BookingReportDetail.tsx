"use client"

import { Button, Divider, Grid, Stack, Typography, Chip } from "@mui/material";
import { StyledLink } from "components/common/link/styled-link";
import { BookingReportById } from "package/api/booking-report/id";
import { formatDate } from "package/util";
import { useEffect } from "react";
import SubCard from "ui-component/cards/SubCard";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { UseGetBookingReportById } from "hooks/use-get-booking-report";
import { useRefresh } from "hooks/use-refresh";
import { CustomerToken } from "hooks/use-login";

// const fakeBookingReportById: BookingReportById = {
//     id: 1,
//     customerContent: "Khách hàng báo cáo vì chuyên gia không có đủ kỹ năng cần thiết.",
//     customerEvidence: "https://drive.google.com/customer-recording",
//     expertContent: "Chuyên gia báo cáo vì khách hàng không chuẩn bị tốt.",
//     expertEvidence: "https://drive.google.com/expert-recording",
//     staffNote: "Lưu ý: Cần kiểm tra lại kỹ năng của chuyên gia.",
//     processingBy: 2,
//     status: 1,
//     bookingId: 101,
//     createdAt: "2023-08-09T08:00:00Z",
//     updatedAt: "2023-08-10T08:00:00Z",
//     bookingReportSuggest: [
//         { id: 1, reportSuggestId: 101, reportSuggest: "Khuyến nghị thay đổi chuyên gia" },
//         { id: 2, reportSuggestId: 102, reportSuggest: "Khuyến nghị hoàn tiền cho khách hàng" },
//     ],
// };

const renderStatusChip = (status: number) => {
    switch (status) {
        case 1:
            return <Chip label="Processing" color="primary" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 2:
            return <Chip label="Expert Processing" color="warning" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 3:
            return <Chip label="Staff Processing" color="info" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 4:
            return <Chip label="Approved" color="success" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 5:
            return <Chip label="Rejected" color="error" sx={{ fontWeight: 'bold', color: 'white' }} />;
        default:
            return <Chip label="Unknown" color="default" sx={{ fontWeight: 'bold', color: 'white' }} />;
    }
};

export default function BookingReportDetail({ reportId, onPrev }: { reportId: number, onPrev: () => void }) {
    const { refresh, refreshTime } = useRefresh();
    const { customerToken } = CustomerToken();
    const { bookingReportById, loading: bookingReportByIdLoading } = UseGetBookingReportById({ id: reportId }, refreshTime, customerToken);

    useEffect(() => {
        console.log("bookingReportById:", bookingReportById);
    }, [bookingReportById]);

    return (
        <SubCard>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2">
                                    Booking report được tạo vào :
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(bookingReportById?.createdAt, "dd/MM/yyyy - hh:mm")}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2">
                                    Booking report được cập nhật vào :
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(bookingReportById?.updatedAt, "dd/MM/yyyy - hh:mm")}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={4} alignItems="flex-start" justifyContent="center">

                                <Grid item xs={12} sm={12} md={12}>
                                    <Stack
                                        direction="row"
                                        spacing={3}
                                        sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}
                                    >
                                        <Stack spacing={2} flex={1}>
                                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                                Report Suggest:
                                            </Typography>
                                            <Stack spacing={1} direction="row" flexWrap="wrap" gap={1}>
                                                {bookingReportById?.bookingReportSuggest.map((suggest) => (
                                                    <Chip
                                                        key={suggest.id}
                                                        label={suggest.reportSuggest}
                                                        variant="outlined"
                                                        size="medium"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            borderColor: 'primary.main',
                                                            color: 'primary.main',
                                                            marginBottom: 1,
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Stack>
                                        <Stack spacing={2} flex={1}>
                                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                                Trạng thái booking report:
                                            </Typography>
                                            <Stack spacing={1} direction="row" flexWrap="wrap" gap={1}>
                                                {renderStatusChip(bookingReportById?.status)}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <Stack spacing={3} sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                        <Typography variant="h5" fontWeight="bold">Báo cáo từ khách hàng</Typography>
                                        <Stack spacing={2}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1" fontWeight="medium">
                                                    Lý do báo cáo:
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    {bookingReportById?.customerContent}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1" fontWeight="medium">Bằng chứng:</Typography>
                                                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                                                    <a href={bookingReportById?.customerEvidence} target="_blank" rel="noopener noreferrer">
                                                        {bookingReportById?.customerEvidence}
                                                    </a>
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <Stack spacing={3} sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                        <Typography variant="h5" fontWeight="bold">Báo cáo từ chuyên gia</Typography>
                                        <Stack spacing={2}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1" fontWeight="medium">
                                                    Lý do báo cáo:
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    {bookingReportById?.expertContent}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1" fontWeight="medium">Bằng chứng:</Typography>
                                                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                                                    <a href={bookingReportById?.expertEvidence} target="_blank" rel="noopener noreferrer">
                                                        {bookingReportById?.expertEvidence}
                                                    </a>
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />} onClick={onPrev}>
                                        Quay lại
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SubCard>
    );
}
