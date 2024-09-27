"use client"

import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Box,
    Chip,
    IconButton,
    Pagination,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { UseGetBookingReportForCustomer } from "hooks/use-get-booking-report";
import { CustomerToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { useEffect, useState } from "react";
import CircularLoader from "ui-component/CircularLoader";
import StartIcon from '@mui/icons-material/Start';
import Link from "next/link";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { RenderBookingReportTable } from "./BookingReportTable";

// const fakeBookingReports = {
//     list: [
//         {
//             id: 1,
//             customerContent: "Khách hàng không hài lòng với dịch vụ, yêu cầu hoàn tiền.",
//             expertContent: "Chuyên gia không cung cấp đủ tài liệu như đã hứa.",
//             staffNote: "Đã gửi yêu cầu lên bộ phận dịch vụ khách hàng.",
//             status: 1,
//             bookingId: 1001,
//             createdAt: "2024-08-01T10:00:00Z",
//             updatedAt: "2024-08-02T15:00:00Z",
//             reportSuggest: [
//                 {
//                     id: 1,
//                     reportSuggestId: 201,
//                     reportSuggest: "Hoàn lại tiền cho khách hàng",
//                 },
//                 {
//                     id: 2,
//                     reportSuggestId: 202,
//                     reportSuggest: "Cung cấp tài liệu bổ sung",
//                 }
//             ]
//         },
//         {
//             id: 2,
//             customerContent: "Khách hàng báo cáo rằng buổi phỏng vấn bị hoãn mà không có thông báo.",
//             expertContent: "Chuyên gia không thể tham gia do lý do sức khỏe, đã thông báo với khách hàng.",
//             staffNote: "Đang xử lý tình huống với chuyên gia và khách hàng.",
//             status: 2,
//             bookingId: 1002,
//             createdAt: "2024-08-03T12:30:00Z",
//             updatedAt: "2024-08-04T09:00:00Z",
//             reportSuggest: [
//                 {
//                     id: 3,
//                     reportSuggestId: 203,
//                     reportSuggest: "Lên lịch lại buổi phỏng vấn",
//                 }
//             ]
//         },
//         {
//             id: 3,
//             customerContent: "Khách hàng báo cáo rằng chuyên gia không đủ chuyên môn.",
//             expertContent: "Chuyên gia có chứng chỉ phù hợp nhưng khách hàng không hài lòng với kết quả.",
//             staffNote: "Đã lên kế hoạch tổ chức buổi phỏng vấn lại với chuyên gia khác.",
//             status: 3,
//             bookingId: 1003,
//             createdAt: "2024-08-05T14:45:00Z",
//             updatedAt: "2024-08-06T11:20:00Z",
//             reportSuggest: [
//                 {
//                     id: 4,
//                     reportSuggestId: 204,
//                     reportSuggest: "Tổ chức phỏng vấn lại với chuyên gia khác",
//                 }
//             ]
//         }
//     ],
//     totalPage: 1
// };

export default function BookingReport({ onSelectEvent, onNext }: { onSelectEvent: (id: number) => void, onNext: () => void }) {
    const { refresh, refreshTime } = useRefresh();
    const { customerToken } = CustomerToken();
    const [page, setPage] = useState<number>(1);
    const [rowPage, setRowPage] = useState<number>(1000);
    const { bookingReportForCustomer, loading } = UseGetBookingReportForCustomer({ pageNumber: page, pageSize: rowPage }, refreshTime, customerToken);
    const SkeletonTable = () => {
        return (
            <TableContainer>
                <Skeleton variant="rectangular" width="15%" sx={{ margin: 3 }} />
                <Table sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            {Array.from(new Array(5)).map((_, index) => (
                                <TableCell key={index} sx={{ padding: 2, border: 0 }} width="30%">
                                    <Skeleton variant="rectangular" />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(new Array(5)).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {Array.from(new Array(5)).map((_, cellIndex) => (
                                    <TableCell key={cellIndex} width="30%" sx={{ padding: 2, border: 0 }}>
                                        <Skeleton variant="rectangular" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    useEffect(() => {
        console.log("bookingReportForCustomer", bookingReportForCustomer);
    }, [bookingReportForCustomer]);

    return (
        <Box sx={{ paddingX: 1 }}>
            {bookingReportForCustomer && bookingReportForCustomer.list.length > 0 ?
                (<RenderBookingReportTable bookingReportForCustomer={bookingReportForCustomer.list}
                    onSelectEvent={(id) => { if (onSelectEvent) { onSelectEvent(id); } }}
                    onNext={() => { if (onNext) { onNext() } }} />)
                : (SkeletonTable())}
            {/* <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã Báo Cáo</TableCell>
                            <TableCell>Đề Xuất</TableCell>
                            <TableCell>Ngày Tạo</TableCell>
                            <TableCell align="center">Trạng Thái</TableCell>
                            <TableCell align="center">Ngày Cập Nhật</TableCell>
                            <TableCell align="center" sx={{ pr: 3 }}>Hành động</TableCell>
                            <TableCell align="center" sx={{ pr: 3 }}>Xem buổi phỏng vấn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fakeBookingReports.list.length > 0
                            ? fakeBookingReports.list.map((row) => (
                                <TableRow hover key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell sx={{ maxWidth: 200, wordWrap: "break-word", whiteSpace: "normal" }}>
                                        {row.reportSuggest.map((suggest) => (
                                            <div key={suggest.id}>{suggest.reportSuggest}</div>
                                        ))}
                                    </TableCell>
                                    <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="center">{renderStatusChip(row.status)}</TableCell>
                                    <TableCell align="center">{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="center" sx={{ pr: 3 }}>
                                        <Tooltip title="Xem chi tiết">
                                            <IconButton
                                                color="default"
                                                size="large"
                                                onClick={() => {
                                                    onSelectEvent(row.id);
                                                    onNext();
                                                }}
                                            >
                                                <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="center" sx={{ pr: 3 }}>
                                        <Tooltip title="Xem chi tiết">
                                            <IconButton
                                                color="default"
                                                size="large"
                                                component={Link}
                                                href={`/booking-report/${row.bookingId}`}
                                            >
                                                <KeyboardTabIcon sx={{ fontSize: '1.1rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                            : (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <Typography variant="h5" align="center">
                                            Hiện chưa có báo cáo nào
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Box>
    )
}
