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

export const ShareCVTable = ({ data }: { data: any[] }) => {
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
        const selectAction = shareCV.status ? (
          <Tooltip title="Hiện">
            <IconButton size="small" color="primary">
              <IconEye />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Ẩn">
            <IconButton size="small">
              <IconEyeCancel />
            </IconButton>
          </Tooltip>
        );
        return [
          selectAction,
          <Tooltip title="Chi tiét">
            <StyledLink href={"/manage-share-cv/" + shareCV.id}>
              <IconButton size="small" color="primary">
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

  const RenderClientFilter = (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={4}>
        <FlexBox>
          <Button>Tìm kiếm</Button>
          <Input size="small" onChange={handleChangeEventText} />
        </FlexBox>
      </Grid>
    </Grid>
  );

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
