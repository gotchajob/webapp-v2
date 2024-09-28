'use client';

import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import useSnackbarDialog from 'components/common/snackbar-dialog/snackbar-dialog';
import { useGetBookingCurrent } from 'hooks/use-get-booking';
import { CustomerToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import { useRouter } from 'next/navigation';
import { PatchBookingCancel } from 'package/api/booking/id/cancel';
import { formatDate } from 'package/util';
import { useEffect, useState } from 'react';
import CircularLoader from 'ui-component/CircularLoader';
import Loader from 'ui-component/Loader';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useGetReportSuggest } from 'hooks/use-get-report-suggest';
import { ReportPopup } from './report-popup';
import { RenderCustomerCalendarTable } from './CustomerCalenderTable';
import { useGetPolicyById } from 'hooks/use-get-policy';
import { PostBookingReport } from 'package/api/booking-report';

const getStatusLabel = (status: any) => {
  switch (status) {
    case 1:
      return { label: 'Chờ xác nhận của chuyên gia', color: 'warning' };
    case 2:
      return { label: 'Chờ phỏng vấn', color: 'info' };
    case 3:
      return { label: 'Đang phỏng vấn', color: 'primary' };
    case 4:
      return { label: 'Chờ phản hồi', color: 'default' };
    case 5:
      return { label: 'Hoàn thành', color: 'success' };
    case 6:
      return { label: 'Hủy bởi khách hàng', color: 'error' };
    case 7:
      return { label: 'Hủy bởi chuyên gia', color: 'error' };
    case 8:
      return { label: 'Đã bị report', color: 'error' };
    default:
      return { label: 'Trạng thái không xác định', color: 'default' };
  }
};

const isToday = (date: string) => {
  const today = new Date();
  const formattedToday = formatDate(today.toISOString(), 'dd-MM-yyyy');
  const formattedDate = formatDate(date, 'dd-MM-yyyy');
  return formattedDate === formattedToday;
};

const BookingCalendar = ({ onNext, onSelectEvent }: { onNext: () => void; onSelectEvent: (event: any) => void }) => {

  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();

  const router = useRouter();

  const { refreshTime, refresh } = useRefresh();

  const [loading, setLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(0);

  const { customerToken } = CustomerToken();

  const { bookings, loading: bookingsLoading } = useGetBookingCurrent(customerToken, refreshTime);

  const [selectedBooking, setSelectedBooking] = useState<{
    id: number;
    type: 'accept' | 'reject' | 'report';
  } | null>(null);

  const { policyById } = useGetPolicyById({ id: 6 }, refreshTime);

  const [cancelReason, setCancelReason] = useState<string>('');

  const handleCloseDialog = () => {
    setSelectedBooking(null);
    setCancelReason('');
  };

  const handleConfirmCancel = async () => {
    handleCloseDialog();
    try {
      const res = await PatchBookingCancel({ id: selectedBooking ? selectedBooking.id : 0, reason: cancelReason }, customerToken);
      if (res.status !== 'success') {
        throw new Error(res.responseText);
      }
      showSnackbarDialog('Hủy đặt lịch thành công', 'success');
      refresh();
    } catch (error: any) {
      console.log(error);
      showSnackbarDialog(error, 'error');
    }
  };

  // const handleReport = async () => {
  //   handleCloseDialog();
  //   try {
  //     const res = await PostBookingReport({ id: selectedBooking ? selectedBooking.id : 0, reason: cancelReason }, customerToken);
  //     if (res.status !== 'success') {
  //       throw new Error(res.responseText);
  //     }
  //     showSnackbarDialog('Hủy đặt lịch thành công', 'success');
  //     refresh();
  //   } catch (error: any) {
  //     console.log(error);
  //     showSnackbarDialog(error, 'error');
  //   }
  // };

  useEffect(() => {
    console.log('bookings:', bookings);
    if (bookings) {
      setLoading(false);
    }
  }, [bookings]);

  if (loading) return <Loader />;

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

  return (

    <Box sx={{ paddingX: 5, paddingY: 1 }}>
      <Typography variant="body1" color="primary" sx={{ fontStyle: 'italic' }}>
        Bạn chỉ có thể hủy đặt lịch những buổi phỏng vấn cách {`${policyById.value}`} phút hiện tại.
      </Typography>

      {bookingsLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress size={50} />
        </Box>
      ) : bookings && bookings.length > 0 ? (
        <RenderCustomerCalendarTable
          bookings={bookings}
          onSelectEvent={(id) => {
            onSelectEvent(id);
          }}
          onNext={onNext}
          setSelectedBooking={setSelectedBooking}
        />
      ) : (
        <Typography variant="h5" align="center" sx={{ paddingTop: 5 }}>
          Hiện chưa có buổi đặt lịch nào
        </Typography>
      )}

      {/* Dialogs for actions */}
      <Dialog open={selectedBooking?.type === 'reject'} onClose={handleCloseDialog} maxWidth="sm" fullWidth sx={{ borderRadius: '10px' }}>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Nhập lý do từ chối</DialogTitle>
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
          <Button onClick={handleCloseDialog} color="secondary" sx={{ marginRight: 1, fontWeight: 'bold' }}>
            Đóng
          </Button>
          <Button onClick={handleConfirmCancel} color="primary" sx={{ fontWeight: 'bold' }}>
            Hủy đặt lịch
          </Button>
        </DialogActions>
      </Dialog>
      <ReportPopup bookingId={selectedBooking?.id} open={selectedBooking?.type === 'report'} handleClose={handleCloseDialog} />
      <SnackbarDialog />
    </Box>
  );
};

export default BookingCalendar;

{/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Mã chuyên gia</TableCell>
              <TableCell>Thời điểm đặt lịch</TableCell>
              <TableCell>Thời điểm bắt đầu</TableCell>
              <TableCell>Thời điểm kết thúc</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings && bookings.length > 0
              ? bookings.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell sx={{ pl: 3 }}>{row.expertId}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {formatDate(row.createdAt, 'dd/MM/yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{
                        color: isToday(row.startInterviewDate) ? 'success.main' : 'black'
                      }}
                    >
                      {formatDate(row.startInterviewDate, 'dd/MM/yyyy - hh:mm')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{
                        color: isToday(row.endInterviewDate) ? 'success.main' : 'black'
                      }}
                    >
                      {formatDate(row.endInterviewDate, 'dd/MM/yyyy - hh:mm')}
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
                          if (onSelectEvent) {
                            onSelectEvent(row);
                            onNext();
                          }
                        }}
                      >
                        <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Hủy đặt lịch">
                      <IconButton
                        color="secondary"
                        size="large"
                        disabled={!row.canCancel}
                        onClick={() => setSelectedBooking({ id: row.id, type: 'reject' })}
                      >
                        <CloseIcon sx={{ fontSize: '1.1rem' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Báo cáo">
                      <IconButton color="error" size="large" onClick={() => setSelectedBooking({ id: row.id, type: 'report' })}>
                        <ReportProblemIcon sx={{ fontSize: '1.1rem' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
              : !loading && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography variant="h5" align="center" sx={{ pb: 20 }}>
                      Hiện chưa có buổi đặt lịch nào
                    </Typography>
                  </TableCell>
                </TableRow>
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
      </TableContainer> */}