"use client";

import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import CircularLoader from "ui-component/CircularLoader";
import Loader from "ui-component/Loader";
import { useGetBookingCurrent } from "hooks/use-get-booking";
import { CustomerToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { useRouter } from "next/navigation";
import { formatDate } from "package/util";
import { useEffect, useState } from "react";

// Function to get the status label
const getStatusLabel = (status: any) => {
    switch (status) {
        case 1:
            return { label: "Chờ xác nhận của chuyên gia", color: "warning" };
        case 2:
            return { label: "Chờ phỏng vấn", color: "info" };
        case 3:
            return { label: "Đang phỏng vấn", color: "primary" };
        case 4:
            return { label: "Chờ phản hồi", color: "default" };
        case 5:
            return { label: "Hoàn thành", color: "success" };
        case 6:
            return { label: "Hủy bởi khách hàng", color: "error" };
        case 7:
            return { label: "Hủy bởi chuyên gia", color: "error" };
        case 8:
            return { label: "Từ chối", color: "error" };
        default:
            return { label: "Trạng thái không xác định", color: "default" };
    }
};

const isToday = (date: string) => {
    const today = new Date();
    const formattedToday = formatDate(today.toISOString(), "dd-MM-yyyy");
    const formattedDate = formatDate(date, "dd-MM-yyyy");
    return formattedDate === formattedToday;
};

const BookingCalendar = ({
    onNext,
    onSelectEvent,
}: {
    onNext: () => void;
    onSelectEvent: (event: any) => void;
}) => {
    const router = useRouter();

    const { refreshTime, refresh } = useRefresh();

    const [loading, setLoading] = useState<boolean>(true);

    const { customerToken } = CustomerToken();

    const { bookings } = useGetBookingCurrent(customerToken, refreshTime);

    const [selectedBooking, setSelectedBooking] = useState<{
        id: number;
        type: "accept" | "reject" | "ban";
    } | null>(null);

    const [cancelReason, setCancelReason] = useState<string>("");

    const handleOpenDialog = (
        bookingId: number,
        type: "accept" | "reject" | "ban"
    ) => {
        setSelectedBooking({ id: bookingId, type });
    };

    const handleCloseDialog = () => {
        setSelectedBooking(null);
        setCancelReason("");
    };

    const handleConfirmAccept = async () => {
        handleCloseDialog();
    };

    const handleConfirmCancel = async () => {
        handleCloseDialog();
    };

    useEffect(() => {
        console.log("bookings:", bookings);
        if (bookings) {
            setLoading(false);
        }
    }, [bookings]);

    if (loading) return <Loader />;

    return (
        <Box sx={{ height: '100vh', paddingX: 5, paddingY: 1 }}>
            <Typography variant="body1" color="primary" sx={{ fontStyle: 'italic', mt: 2 }}>
                Bạn chỉ có thể hủy đặt lịch những buổi phỏng vấn cách 3 ngày hiện tại.
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>Mã chuyên gia</TableCell>
                            <TableCell>Thời điểm đặt lịch</TableCell>
                            <TableCell>Thời điểm bắt đầu</TableCell>
                            <TableCell>Thời điểm kết thúc</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center" sx={{ pr: 3 }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings && bookings.length > 0 ? (
                            bookings.map((row) => (
                                <TableRow hover key={row.id} >
                                    <TableCell sx={{ pl: 3 }}>{row.expertId}</TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" noWrap sx={{
                                            color: isToday(row.createdAt) ? 'success.main' : 'black'
                                        }}>
                                            {formatDate(row.createdAt, "dd/MM/yyyy")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" noWrap
                                            sx={{
                                                color: isToday(row.startInterviewDate) ? 'success.main' : 'black'
                                            }}
                                        >
                                            {formatDate(row.startInterviewDate, "dd/MM/yyyy - hh:mm")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" noWrap
                                            sx={{
                                                color: isToday(row.endInterviewDate) ? 'success.main' : 'black'
                                            }}>
                                            {formatDate(row.endInterviewDate, "dd/MM/yyyy - hh:mm")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip label={getStatusLabel(row.status).label} color={getStatusLabel(row.status).color as any} />
                                    </TableCell>
                                    <TableCell align="center" sx={{ pr: 3 }}>
                                        <Tooltip title="Xem chi tiết">
                                            <IconButton
                                                color="default"
                                                size="large"
                                                onClick={() => {
                                                    router.push(`/expert/booking-calendar/${row.id}`);
                                                }}
                                            >
                                                <VisibilityIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip>
                                        {/* <Tooltip title="Chấp nhận">
                                            <IconButton
                                                color="primary"
                                                size="large"
                                                onClick={() => handleOpenDialog(row.id, 'accept')}
                                            >
                                                <CheckIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip> */}
                                        <Tooltip title="Hủy đặt lịch">
                                            <IconButton
                                                color="secondary"
                                                size="large"
                                                disabled={!row.canCancel}
                                                onClick={() => handleOpenDialog(row.id, 'reject')}
                                            >
                                                <CloseIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip>
                                        {/* <Tooltip title="Chặn">
                                            <IconButton
                                                color="error"
                                                size="large"
                                                onClick={() => handleOpenDialog(row.id, 'ban')}
                                            >
                                                <BlockIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip> */}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            !loading && (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <Typography variant="h5" align="center" sx={{ pb: 20 }}>
                                            Hiện chưa có buổi đặt lịch nào
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <CircularLoader />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialogs for actions */}
            <Dialog
                open={selectedBooking?.type === "reject"}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                sx={{ borderRadius: "10px" }}
            >
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                    Nhập lý do từ chối
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cancelReason"
                        label="Lý do từ chối"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        sx={{ marginTop: 1, marginBottom: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        color="secondary"
                        sx={{ marginRight: 1, fontWeight: "bold" }}
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={handleConfirmCancel}
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                    >
                        Từ chối
                    </Button>
                </DialogActions>
            </Dialog>

            {/* <Dialog
                open={selectedBooking?.type === "accept"}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                sx={{ borderRadius: "10px" }}
            >
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                    Xác nhận chấp nhận phỏng vấn
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Bạn có chắc chắn muốn chấp nhận lịch phỏng vấn này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        color="secondary"
                        sx={{ marginRight: 1, fontWeight: "bold" }}
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={handleConfirmAccept}
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                    >
                        Chấp nhận
                    </Button>
                </DialogActions>
            </Dialog> */}

            {/* <Dialog
                open={selectedBooking?.type === "ban"}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                sx={{ borderRadius: "10px" }}
            >
                <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
                    Xác nhận chặn khách hàng
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Bạn có chắc chắn muốn chặn đặt lịch phỏng từ khách hàng này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        color="secondary"
                        sx={{ marginRight: 1, fontWeight: "bold" }}
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={handleConfirmAccept}
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                    >
                        Chặn
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Box>
    );
};

export default BookingCalendar;
