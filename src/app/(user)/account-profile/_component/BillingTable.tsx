import {
  BookingReportForCustomer,
  GetBookingReportForCustomer,
  GetBookingReportForCustomerRequest
} from 'package/api/booking-report/for-customer';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { DataGridHeader, DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetTransactionType } from 'hooks/use-get-transaction-type';
import { useRefresh } from 'hooks/use-refresh';
import { TransactionCurrent } from 'package/api/transaction/current';

const renderTransactionStatus = (status: number) => {
    switch (status) {
      case 1:
        return <Chip label="Thành công" color="success" />;
      case 2:
        return <Chip label="Đang xử lý" color="warning" />;
      case 3:
        return <Chip label="Thất bại" color="error" />;
      default:
        return <Chip label="Unknown" />;
    }
  };
  
  const renderTransactionType = (status: number) => {
    switch (status) {
      case 1:
        return <Chip label="Nạp tiền" />;
      case 2:
        return <Chip label="Rút tiền" />;
      case 3:
        return <Chip label="Mua dịch vụ" />;
      case 4:
        return <Chip label="Nhận tiền dịch vụ" />;
      case 5:
        return <Chip label="Hoàn tiền" />;
      default:
        return <Chip label="Không xác định" color="default" />;
    }
  };
  

export const RenderBillingTable = ({ transactionCurrent }: { transactionCurrent: TransactionCurrent[] }) => {
  const { refresh, refreshTime } = useRefresh();

  const { transactionType, loading: transactionTypeLoading } = useGetTransactionType(refreshTime);

  const getTransactionTypeName = (typeId: number) => {
    const type = transactionType?.find((type) => type.id === typeId);
    return type ? type.description : 'Không xác định';
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID Giao Dịch',
      flex: 1
    },
    {
      field: 'amount',
      headerName: 'Số Tiền Giao Dịch',
      flex: 1,
      renderCell: (params) => <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{params.value.toLocaleString()}</Box>
    },
    {
      field: 'typeId',
      headerName: 'Loại giao dịch',
      flex: 1,
      renderCell: (params) => renderTransactionType(params.value)
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: (params) => renderTransactionStatus(params.value)
    },
    {
      field: 'description',
      headerName: 'Mô Tả',
      flex: 1,
      renderCell: (params) => <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{params.value}</Box>
    },
    {
      field: 'createdAt',
      headerName: 'Ngày Tạo Giao Dịch',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{formatDate(params.value, 'dd/MM/yyyy hh:mm')}</Box>
      )
    }
    // {
    //     field: 'object',
    //     headerName: 'Thao Tác',
    //     flex: 1,
    //     renderCell: (params) =>
    //         <>
    //             <Tooltip title="Xem chi tiết report">
    //                 <IconButton
    //                     color="default"
    //                     size="large"
    //                 // onClick={() => {
    //                 //     onSelectEvent(params.row.id);
    //                 //     onNext();
    //                 // }}
    //                 >
    //                     <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
    //                 </IconButton>
    //             </Tooltip>
    //         </>
    // },
  ];

  const { handleChangeEventText, text, findAllIndexByAnyField } = useGetFilter();

  const filteredData = useMemo(() => {
    let data = [...transactionCurrent];
    if (text.trim() !== '') {
      const lowerCaseText = text.toLowerCase();
      data = data
        .sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          if (dateA < dateB) {
            return 1;
          } else {
            return -1;
          }
        })
        .filter((row) => {
          return (
            formatDate(row.createdAt, 'dd/MM/yyyy hh:mm').includes(lowerCaseText) ||
            row.id.toString().toLowerCase().includes(lowerCaseText) ||
            row.amount.toString().toLowerCase().includes(lowerCaseText) ||
            getTransactionTypeName(row.typeId).toLowerCase().includes(lowerCaseText) ||
            row.description.toLowerCase().includes(lowerCaseText)
          );
        });
    }
    return data;
  }, [text, transactionCurrent]);

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
      object: JSON.stringify(data)
    }))
  };

  return (
    <MainCard title={RenderClientFilter}>
      <DataGridTable props={props} />
    </MainCard>
  );
};
