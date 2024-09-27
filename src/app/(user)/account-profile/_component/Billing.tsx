'use client';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, CircularProgress, IconButton, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from '@mui/material';
import { useGetTransactionCurrent } from 'hooks/use-get-transaction';
import { useGetTransactionType } from 'hooks/use-get-transaction-type';
import { CustomerToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import { TransactionCurrent } from 'package/api/transaction/current';
import { formatDate } from 'package/util';
import { useEffect, useState } from 'react';
import { RenderBillingTable } from './BillingTable';

export default function TransactionTable() {
  const { refresh, refreshTime } = useRefresh();
  const { customerToken } = CustomerToken();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1000);

  const { transactionCurrent, loading: transactionCurrentLoading } = useGetTransactionCurrent(
    { pageNumber: page, pageSize: rowsPerPage },
    customerToken,
    refreshTime
  );

  const { transactionType, loading: transactionTypeLoading } = useGetTransactionType(refreshTime);

  const getTransactionTypeName = (typeId: number) => {
    const type = transactionType?.find((type) => type.id === typeId);
    return type ? type.description : 'Không xác định';
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  useEffect(() => {
    console.log("transactionCurrent", transactionCurrent);
    console.log("transactionType", transactionType);
  }, [transactionCurrent, transactionType]);

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
    <Box>
      {transactionCurrent && transactionCurrent.list.length > 0 ? (
        <RenderBillingTable transactionCurrent={transactionCurrent.list} />
      ) : (SkeletonTable())}
    </Box>
  );
}

{/* <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#2196F3', '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
            <TableRow>
              <TableCell>ID Giao Dịch</TableCell>
              <TableCell>Số Tiền Giao Dịch</TableCell>
              <TableCell>Loại Giao Dịch</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell align="center">Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ '& .MuiTableRow-root:hover': { bgcolor: '#E3F2FD' } }}>
            {transactionCurrentLoading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : transactionCurrent.list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="textSecondary">
                    Hiện chưa có giao dịch nào.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              transactionCurrent.list.map((transaction: TransactionCurrent) => (
                <TableRow key={transaction.id}>
                  <TableCell sx={{ color: '#2196F3', fontWeight: 500 }}>{transaction.id}</TableCell>
                  <TableCell>{transaction.amount.toLocaleString()} VND</TableCell>
                  <TableCell>{getTransactionTypeName(transaction.typeId)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{formatDate(transaction.createdAt, "dd/MM/yyyy - hh:mm")}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Xem Chi Tiết">
                      <IconButton onClick={() => { }} sx={{ color: '#2196F3' }}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={(transactionCurrent.totalPage - 1) * rowsPerPage + transactionCurrent.list.length}
          page={page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng mỗi trang:"
          rowsPerPageOptions={[5]}
          sx={{
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            bgcolor: '#E3F2FD', '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { color: '#2196F3' }
          }}
        />
      </TableContainer> */}