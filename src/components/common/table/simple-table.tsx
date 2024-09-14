import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import { FlexCenter } from '../box/flex-box';

export const SimpleTable = ({
  header,
  body,
  mainTitle,
  subTitle
}: {
  mainTitle?: string;
  subTitle?: string;
  header: string[];
  body: string[][];
}) => {
  return (
    <MainCard
      title={
        <FlexCenter>
          <Typography variant="h4">{mainTitle}</Typography>
          <Typography variant="subtitle2">{subTitle}</Typography>
        </FlexCenter>
      }
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#3f5161' }}>
              {header.map((value, index) => (
                <TableCell sx={{ minWidth: 100, color: 'white !important' }} key={index}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {body.map((row: string[], index: number) => (
              <TableRow key={index}>
                {row.map((col, index) => (
                  <TableCell key={index}>{col}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};
