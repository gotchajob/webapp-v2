import TableCell, { TableCellProps } from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { FlexCenter } from '../box/flex-box';

export const CustomTableCellHeader = ({ children, ...props }: TableCellProps) => {
  return (
    <TableCell {...props} sx={{ ...props.sx, height: '55.2px', px: 3, py: 0, border: '1px solid #dee2e6' }}>
      <FlexCenter>
        <Typography variant="h4">{children}</Typography>
      </FlexCenter>
    </TableCell>
  );
};

export const CustomTableCellBody = ({ children, ...props }: TableCellProps) => {
  return (
    <TableCell {...props} sx={{ height: '54px', px: 3, py: 0, border: '1px solid #dee2e6', ...props.sx }}>
      {children}
    </TableCell>
  );
};
