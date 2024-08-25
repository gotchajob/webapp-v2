import { Avatar, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { FlexBox } from 'components/common/box/flex-box';
import { PRIMARYCOLOR } from 'components/common/config';
import { Text } from 'components/common/text/text';
import { formatDate } from 'package/util';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HideImageIcon from '@mui/icons-material/HideImage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { StyledLink } from 'components/common/link/styled-link';
const sampleData = {
  status: 'success',
  responseText: 'success',
  data: {
    list: [
      {
        id: 1,
        customerId: 1001,
        caption: 'A beautiful sunset at the beach',
        cvImage: 'https://example.com/images/sunset.jpg',
        categoryId: 5,
        category: 'Nature',
        createdAt: '2024-08-25T06:29:18.834Z',
        userInfo: {
          fullName: 'Nguyen Van A',
          email: 'nguyenvana@example.com',
          avatar: 'https://example.com/avatars/avatar1.jpg'
        }
      },
      {
        id: 2,
        customerId: 1002,
        caption: 'Delicious homemade pizza',
        cvImage: 'https://example.com/images/pizza.jpg',
        categoryId: 2,
        category: 'Food',
        createdAt: '2024-08-24T10:15:45.734Z',
        userInfo: {
          fullName: 'Tran Thi B',
          email: 'tranthib@example.com',
          avatar: 'https://example.com/avatars/avatar2.jpg'
        }
      },
      {
        id: 3,
        customerId: 1003,
        caption: 'Exploring the mountains',
        cvImage: 'https://example.com/images/mountains.jpg',
        categoryId: 5,
        category: 'Nature',
        createdAt: '2024-08-23T14:22:10.512Z',
        userInfo: {
          fullName: 'Le Van C',
          email: 'levanc@example.com',
          avatar: 'https://example.com/avatars/avatar3.jpg'
        }
      },
      {
        id: 4,
        customerId: 1004,
        caption: 'Modern city skyline at night',
        cvImage: 'https://example.com/images/city.jpg',
        categoryId: 3,
        category: 'Urban',
        createdAt: '2024-08-22T18:47:33.915Z',
        userInfo: {
          fullName: 'Pham Thi D',
          email: 'phamthid@example.com',
          avatar: 'https://example.com/avatars/avatar4.jpg'
        }
      },
      {
        id: 5,
        customerId: 1005,
        caption: 'Artistic abstract painting',
        cvImage: 'https://example.com/images/abstract.jpg',
        categoryId: 4,
        category: 'Art',
        createdAt: '2024-08-21T08:03:21.145Z',
        userInfo: {
          fullName: 'Hoang Van E',
          email: 'hoangvane@example.com',
          avatar: 'https://example.com/avatars/avatar5.jpg'
        }
      }
    ],
    totalPage: 10
  }
};
export const ShareCVTable = () => {
  const headers = ['Ảnh cv', 'Mô tả', 'Danh mục', 'Ngày tạo', 'Hành động'];
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: PRIMARYCOLOR }}>
            {headers.map((value, index) => (
              <TableCell sx={{ color: 'white !important' }} key={index}>
                {value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.data.list.map((share, index) => (
            <TableRow key={index}>
              <TableCell>
                <Avatar src={share.cvImage} alt="" />
              </TableCell>
              <TableCell>
                <Text>{share.caption}</Text>
              </TableCell>
              <TableCell>
                <Text fontWeight={'bold'}> {share.category}</Text>
              </TableCell>
              <TableCell>
                <Text>{formatDate(share.createdAt, 'dd-MM-yyyy')}</Text>
              </TableCell>
              <TableCell>
                <Tooltip title={'Xóa'}>
                  <IconButton size="small" color="error">
                    <DeleteForeverIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'Ẩn'}>
                  <IconButton size="small">
                    <HideImageIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'Hiện'}>
                  <IconButton size="small" color="success">
                    <SlideshowIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={'Chi tiết'}>
                  <StyledLink href={`/manage-share-cv/${share.id}`}>
                    <IconButton size="small">
                      <VisibilityIcon />
                    </IconButton>
                  </StyledLink>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
