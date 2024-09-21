
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from "components/common/filter-table/hook-filter";
import Link from 'next/link';
import { BookingCurrent } from "package/api/booking/customer/current";
import { formatDate } from 'package/util';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CloseIcon from '@mui/icons-material/Close';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const getStatusLabel = (status: any) => {
    switch (status) {
        case 1:
            return <Chip label="Chờ xác nhận của chuyên gia" color="warning" />;
        case 2:
            return <Chip label="Chờ phỏng vấn" color="info" />;
        case 3:
            return <Chip label="Đang phỏng vấn" color="primary" />;
        case 4:
            return <Chip label="Chờ phản hồi" color="default" />;
        case 5:
            return <Chip label="Hoàn thành" color="success" />;
        case 6:
            return <Chip label="Hủy bởi khách hàng" color="error" />;
        case 7:
            return <Chip label="Hủy bởi chuyên gia" color="error" />;
        case 8:
            return <Chip label="Từ chối" color="error" />;
        default:
            return <Chip label="Trạng thái không xác định" color="default" />;
    }
};

const isToday = (date: string) => {
    const today = new Date();
    const formattedToday = formatDate(today.toISOString(), 'dd-MM-yyyy');
    const formattedDate = formatDate(date, 'dd-MM-yyyy');
    return formattedDate === formattedToday;
};

export const RenderCustomerCalendarTable = ({ bookings, onSelectEvent, onNext, setSelectedBooking }: { bookings: BookingCurrent[], onSelectEvent: (id: number) => void, onNext: () => void, setSelectedBooking: (booking: { id: number; type: 'accept' | 'reject' | 'report'; }) => void }) => {

    const columns: GridColDef[] = [
        {
            field: 'expertInfo',
            headerName: 'Tên chuyên gia',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value.fullName}
                </Box>
            )
        },

        {
            field: 'createdAt',
            headerName: 'Thời điểm đặt lịch',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
        {
            field: 'startInterviewDate',
            headerName: 'Thời điểm bắt đầu',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
        {
            field: 'endInterviewDate',
            headerName: 'Thời điểm kết thúc',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
        {
            field: 'status',
            headerName: 'Trạng Thái',
            flex: 1.5,
            renderCell: (params) => getStatusLabel(params.value),
        },
        {
            field: 'object',
            headerName: 'Thao Tác',
            flex: 1,
            renderCell: (params) =>
                <>
                    <Tooltip title="Xem chi tiết">
                        <IconButton
                            color="default"
                            size="large"
                            onClick={() => {
                                if (onSelectEvent) {
                                    onSelectEvent(params.row);
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
                            disabled={!params.row.canCancel}
                            onClick={() => setSelectedBooking({ id: params.row.id, type: 'reject' })}
                        >
                            <CloseIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Báo cáo">
                        <IconButton color="error" size="large" onClick={() => setSelectedBooking({ id: params.row.id, type: 'report' })}>
                            <ReportProblemIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Tooltip>
                </>
        },

    ]

    const { handleChangeEventText, text, findAllIndexByAnyField } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...bookings];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((row) => {
                return (
                    row.id.toString().includes(lowerCaseText) ||
                    formatDate(row.createdAt, 'dd/MM/yyyy hh:mm').includes(lowerCaseText) ||
                    formatDate(row.startInterviewDate, 'dd/MM/yyyy hh:mm').includes(lowerCaseText) ||
                    formatDate(row.endInterviewDate, 'dd/MM/yyyy hh:mm').includes(lowerCaseText) ||
                    getStatusLabel(row.status)?.props.label.toLowerCase().includes(lowerCaseText)
                );
            });
        }
        return data;
    }, [text, bookings])

    const RenderClientFilter = (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FlexBox>
                    <Button>Tìm kiếm</Button>
                    <Input size="small" onChange={handleChangeEventText} />
                </FlexBox>
            </Grid>
            <Grid item xs={12} lg={8}>
                <FlexBox justifyContent={'right'}>
                    {/* <Button variant="outlined" onClick={handleExportExcel}>
                        Excel
                    </Button> */}
                </FlexBox>
            </Grid>
        </Grid>
    );

    const props: DataGridTableProps = {
        columns,
        rows: filteredData.map((data, index) => ({
            ...data,
            object: JSON.stringify(data),
        })),
    };

    return (
        <MainCard title={RenderClientFilter}>
            <DataGridTable props={props} />
        </MainCard>
    );
}