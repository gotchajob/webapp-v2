'use client';

import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from 'ui-component/cards/MainCard';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShareIcon from '@mui/icons-material/Share';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UserCVList from './_component/UserCVList';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SubCard from 'ui-component/cards/SubCard';
import { StyledLink } from 'components/common/link/styled-link';
import { useGetCVCurrent } from 'hooks/use-get-cv-current';
import { CustomerToken } from 'hooks/use-login';

const data = [
  { name: 'Lê Khải Phú', createdAt: '27-08-2023 21:46 PM' },
  { name: 'Lý Anh Kiệt', createdAt: '15-09-2023 10:30 AM' },
  { name: 'Vi Chí', createdAt: '08-10-2023 14:15 PM' },
  { name: 'Nguyễn Văn Hiệp', createdAt: '23-11-2023 08:45 AM' },
  { name: 'Nguyễn Văn A', createdAt: '10-12-2023 19:20 PM' }
];

const sortOptions = [{ title: 'CV tạo mới nhất' }, { title: 'CV tạo cũ nhất' }];

const ManageCVPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const { customerToken } = CustomerToken();
  const { cvs } = useGetCVCurrent(customerToken, 1);
  
  return (
    <MainCard boxShadow hover>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '19px',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            CV đã tạo trên GotchaJob
          </Typography>
          <StyledLink href={'/create-cv'}>
            <Button
              sx={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                fontFamily: 'Inter, sans-serif',
                borderRadius: 30,
                backgroundColor: '#59ABD9',
                '&:hover': {
                  backgroundColor: '#AAD4EB'
                }
              }}
            >
              <AddIcon
                sx={{
                  fontSize: '19px',
                  color: 'white',
                  paddingRight: '1px'
                }}
              />
              Tạo mới
            </Button>
          </StyledLink>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" my={5}>
          <TextField
            placeholder="Tìm kiếm theo tên CV"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker format="dd-MM-yyyy" label="Lọc theo ngày tạo" />
          </LocalizationProvider>
          <Autocomplete
            disableClearable
            options={sortOptions}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => <TextField {...params} placeholder="Sắp xếp" sx={{ minWidth: 200 }} />}
          />
        </Stack>
        <UserCVList CVList={cvs} />
      </CardContent>
    </MainCard>
  );
};

export default ManageCVPage;
