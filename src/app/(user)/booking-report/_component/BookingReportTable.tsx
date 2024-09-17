
import { BookingReportForCustomer, GetBookingReportForCustomer, GetBookingReportForCustomerRequest } from "package/api/booking-report/for-customer";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import Link from 'next/link';
import { formatDate } from 'package/util';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { useGetFilter } from "components/common/filter-table/hook-filter";
import { DataGridHeader, DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';

const renderStatusChip = (status: number) => {
    switch (status) {
        case 1:
            return <Chip label="Processing" color="primary" />;
        case 2:
            return <Chip label="Expert Processing" color="warning" />;
        case 3:
            return <Chip label="Staff Processing" color="info" />;
        case 4:
            return <Chip label="Approved" color="success" />;
        case 5:
            return <Chip label="Rejected" color="error" />;
        default:
            return <Chip label="Unknown" color="default" />;
    }
};

export const RenderBookingReportTable = ({ bookingReportForCustomer, onSelectEvent, onNext }: { bookingReportForCustomer: BookingReportForCustomer[], onSelectEvent: (id: number) => void, onNext: () => void }) => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Mã Báo Cáo', flex: 1 },
        {
            field: 'reportSuggest',
            headerName: 'Report Suggest',
            flex: 2,
            renderCell: (params) => (
                <Box sx={{ maxWidth: 300, wordWrap: "break-word", whiteSpace: 'normal' }}>
                    {params.value.map((suggest: any) => (
                        <div key={suggest.id}>{suggest.reportSuggest}</div>
                    ))}
                </Box>
            )
        },
        {
            field: 'createdAt',
            headerName: 'Ngày Tạo',
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
            flex: 1,
            renderCell: (params) => renderStatusChip(params.value),
        },
        {
            field: 'updatedAt',
            headerName: 'Ngày Cập Nhật',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
        {
            field: 'object',
            headerName: 'Thao Tác',
            flex: 1,
            renderCell: (params) =>
                <>
                    <Tooltip title="Xem chi tiết report">
                        <IconButton
                            color="default"
                            size="large"
                            onClick={() => {
                                onSelectEvent(params.row.id);
                                onNext();
                            }}
                        >
                            <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xem chi tiết buổi phỏng vấn">
                        <IconButton
                            color="default"
                            size="large"
                            component={Link}
                            href={`/booking-report/${params.row.bookingId}`}
                        >
                            <KeyboardTabIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Tooltip>
                </>
        },
        // {
        //     field: 'object',
        //     headerName: 'Xem buổi phỏng vấn',
        //     flex: 1.5,
        //     renderCell: (params) =>
        //         <>
        //             <Tooltip title="Xem chi tiết">
        //                 <IconButton
        //                     color="default"
        //                     size="large"
        //                     component={Link}
        //                     href={`/booking-report/${params.row.bookingId}`}
        //                 >
        //                     <KeyboardTabIcon sx={{ fontSize: '1.1rem' }} />
        //                 </IconButton>
        //             </Tooltip>
        //         </>
        // },
    ]

    const { handleChangeEventText, text, findAllIndexByAnyField } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...bookingReportForCustomer];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((row) => {
                return (
                    row.reportSuggest.some((suggest: any) => suggest.reportSuggest.toLowerCase().includes(lowerCaseText)) ||
                    formatDate(row.createdAt, 'dd/MM/yyyy hh:mm').includes(lowerCaseText) ||
                    renderStatusChip(row.status)?.props.label.toLowerCase().includes(lowerCaseText) ||
                    formatDate(row.updatedAt, 'dd/MM/yyyy hh:mm').includes(lowerCaseText)
                );
            });
        }
        return data;
    }, [text, bookingReportForCustomer])

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