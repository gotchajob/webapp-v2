'use client';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GridToolbarContainer, renderActionsCell } from '@mui/x-data-grid/components';
import { GridToolbar, GridToolbarExport } from '@mui/x-data-grid/components/toolbar';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { useGridApiContext } from '@mui/x-data-grid/hooks/utils/useGridApiContext';
import { useGridApiEventHandler } from '@mui/x-data-grid/hooks/utils/useGridApiEventHandler';
import { useGridApiRef } from '@mui/x-data-grid/hooks/utils/useGridApiRef';
import { GridRenderEditCellParams } from '@mui/x-data-grid/models';
import { DataGridProps } from '@mui/x-data-grid/models/props/DataGridProps';
import { ReactNode, useLayoutEffect, useRef } from 'react';

// ==============================|| TABLE - BASIC DATA GRID ||============================== //

export interface DataGridTableProps extends DataGridProps {
  width?: number | string;
  height?: number | string;
}

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          fileName: 'customerDataBase',
          utf8WithBom: true
        }}
      />
    </GridToolbarContainer>
  );
};

export const DataGridTable = ({
  props,
  handleUpdate = () => {},
  stateRef
}: {
  props: DataGridTableProps;
  handleUpdate?: () => void;
  stateRef?: any;
}) => {
  const init: DataGridProps = {
    autoHeight: false,
    initialState: {
      pagination: {
        paginationModel: {
          pageSize: 10
        }
      }
    },
    editMode: 'row',
    slots: { toolbar: CustomToolbar },
    pageSizeOptions: [10, 20, 100],
    onSortModelChange: () => {
      handleUpdate();
    },
    onPaginationModelChange: () => {
      handleUpdate();
    },
    onFilterModelChange: () => {
      handleUpdate();
    },
    onStateChange: (params) => {
      if (stateRef) {
        stateRef.current = params;
      }
    },
    ...props
  };

  return (
    <Box minWidth={props.width} height={props.height}>
      <DataGrid {...init} />
    </Box>
  );
};

export const DataGridHeader = ({ mainTitle, subTitle }: { mainTitle?: string; subTitle?: string }) => (
  <Stack spacing={1}>
    <Typography variant="h4" whiteSpace={'normal'}>
      {mainTitle}
    </Typography>
    <Typography variant="h5" color={'#28a745'}>
      {subTitle}
    </Typography>
  </Stack>
);

export const CustomEditComponent = (props: GridRenderEditCellParams, Component: () => ReactNode) => {
  const { id, value, field, hasFocus } = props;
  const apiRef = useGridApiContext();
  const ref = useRef();

  useLayoutEffect(() => {
    if (hasFocus) {
      //@ts-ignore
      ref.current.focus();
    }
  }, [hasFocus]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };
  // @ts-ignore
  return <input ref={ref} type="text" value={value} onChange={handleValueChange} />;
  // return <Component value={value} />;
};
