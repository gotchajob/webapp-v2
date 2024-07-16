'use client';

import React, { useEffect, useState } from 'react';
// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';

// project import
import MainCard from 'ui-component/cards/MainCard';
import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import CSVExport from 'views/forms/tables/tbl-exports';
import { CustomerToken } from 'hooks/use-login';
import { useGetTransaction } from 'hooks/use-get-transaction';

// sample data
const sampleTransactions = [
  {
    id: 2,
    amount: 10,
    type: 'credit',
    description: 'Sample transaction 2',
    createdAt: '2024-06-15T00:36:56.000+00:00'
  },
  {
    id: 1,
    amount: 10,
    type: 'credit',
    description: 'Sample transaction 1',
    createdAt: '2024-06-15T00:36:42.000+00:00'
  }
];

// table columns
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 80 },
  { field: 'amount', headerName: 'Số tiền nạp', flex: 1, minWidth: 100, type: 'number' },
  { field: 'type', headerName: 'Dạng nạp', flex: 1, minWidth: 100 },
  { field: 'description', headerName: 'Thông tin', flex: 2, minWidth: 200 },
  {
    field: 'createdAt',
    headerName: 'Nạp vào',
    flex: 1.5,
    minWidth: 200,
    type: 'dateTime',
    valueGetter: (params) => new Date(params.value)
  }
];

let headers: any = [];
columns.map((item) => {
  return headers.push({ label: item.headerName, key: item.field });
});

export default function EditableColumn() {
  const [loading, setLoading] = useState(true);

  const [rows, setRows] = useState<GridRowsProp>([]);

  const { customerToken } = CustomerToken();

  const { transaction } = useGetTransaction({ pageNumber: 1, pageSize: 6 }, customerToken);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRows(sampleTransactions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log("transaction:", transaction);
  }, [transaction, customerToken]);


  if (loading) {
    return <CircularProgress />;
  }

  return (
    <MainCard
      content={false}
      title="Danh sách giao dịch"
      secondary={
        <Stack direction="row" spacing={2} alignItems="center">
          <CSVExport data={rows} filename={'danhsachgiaodich.csv'} header={headers} />
        </Stack>
      }
    >
      <Box sx={{ width: '100%' }}>
        <DataGrid hideFooter autoHeight rows={rows} columns={columns} />
      </Box>
    </MainCard>
  );
}
