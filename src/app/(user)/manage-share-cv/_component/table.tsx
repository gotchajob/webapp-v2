'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatNumber, formatDate, stringToDate, calculateAverageRating } from 'package/util';
import { FlexBox } from 'components/common/box/flex-box';
import MainCard from 'ui-component/cards/MainCard';

import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import { useGetFilter } from 'hooks/use-get-filter';
import { DataGridHeader, DataGridTable, DataGridTableProps } from 'components/common/table/data-grid';
import { GridColDef } from '@mui/x-data-grid/models';
import { IconEdit, IconEye, IconEyeCancel } from '@tabler/icons-react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Avatar, Rating } from '@mui/material';
import { Text } from 'components/common/text/text';
import { StyledLink } from 'components/common/link/styled-link';
import { apiServerFetch } from 'package/api/api-fetch';
import { CustomerToken } from 'hooks/use-login';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

export const ShareCVTable = ({ data }: { data: any[] }) => {
  const { customerToken: accessToken } = CustomerToken();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const columns: GridColDef[] = [
    {
      field: 'information',
      headerName: 'Bài đăng',
      minWidth: 150,
      flex: 5,
      renderCell: (params) => (
        <FlexBox>
          <Avatar src={params.value.split(' & ')[0]} alt="" />
          <Text variant="h5" ml={5}>
            {params.value.split(' & ')[1]}
          </Text>
        </FlexBox>
      ),
      renderHeader: (params) => <DataGridHeader mainTitle={params.colDef.headerName} />
    },
    {
      field: 'cvShareRating',
      headerName: 'Đánh giá',
      minWidth: 150,
      flex: 2,
      renderCell: (params) => <Rating value={params.value} readOnly />,
      renderHeader: (params) => <DataGridHeader mainTitle={params.colDef.headerName} />
    },
    {
      field: 'createdAt',
      headerName: 'Ngày đăng',
      minWidth: 150,
      flex: 2,
      valueFormatter: (params) => formatDate(params.value, 'dd/MM/yyyy'),
      renderHeader: (params) => <DataGridHeader mainTitle={params.colDef.headerName} />
    },
    {
      field: 'action',
      headerName: 'Hành động',
      minWidth: 140,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      disableExport: true,
      type: 'action',
      renderHeader: (params) => <DataGridHeader mainTitle={params.colDef.headerName} />,
      renderCell: (params) => {
        const shareCV = JSON.parse(params.value);
        const selectAction =
          shareCV.status === 1 ? (
            <Tooltip title="Hiện">
              <IconButton
                size="small"
                color="primary"
                onClick={() => {
                  handleChangeStatus(shareCV.id, false);
                }}
              >
                <IconEye />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Ẩn">
              <IconButton
                size="small"
                onClick={() => {
                  handleChangeStatus(shareCV.id, true);
                }}
              >
                <IconEyeCancel />
              </IconButton>
            </Tooltip>
          );
        return [
          selectAction,
          <Tooltip title="Chi tiét">
            <StyledLink href={'/manage-share-cv/' + shareCV.id}>
              <IconButton size="small" color="secondary">
                <IconEdit />
              </IconButton>
            </StyledLink>
          </Tooltip>
        ];
      }
    }
  ];

  const { handleChangeEventText, text, findAllIndexByAnyField } = useGetFilter();

  const filteredData = useMemo(() => {
    let list = [...data];
    if (text && text !== '') {
      const filteredIndex = findAllIndexByAnyField(list, text);
      list = list.filter((_, index) => filteredIndex.includes(index));
    }
    return list;
  }, [text, data]);

  const handleChangeStatus = async (id: number, hide: boolean) => {
    try {
      let data: any = null;
      if (hide) {
        data = await apiServerFetch(`/cv-share/${id}/cancel-hidden`, 'PATCH', undefined, accessToken);
      } else {
        data = await apiServerFetch(`/cv-share/${id}/hidden`, 'PATCH', undefined, accessToken);
      }
      if (data.status !== 'success') {
        throw new Error(data.responseText);
      }
      enqueueSnackbar(data.responseText, { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      router.refresh();
    }
  };

  const props: DataGridTableProps = {
    columns,
    rows: filteredData.map((data, index) => ({
      ...data,
      id: index,
      cvShareRating: calculateAverageRating(data.cvShareRating),
      information: data.cvImage + ' & ' + data.caption,
      action: JSON.stringify(data)
    }))
  };

  return (
    <MainCard
      title={
        <Text variant="h4" align="center">
          Quản lí chia sẻ CV
        </Text>
      }
      border
    >
      <DataGridTable props={props} />
    </MainCard>
  );
};
