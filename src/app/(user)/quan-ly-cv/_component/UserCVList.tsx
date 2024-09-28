'use client';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { StyledLink } from 'components/common/link/styled-link';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CVCurrent } from 'package/api/cv/current';
import { formatDate } from 'package/util';
import { useRef } from 'react';

const UserCVList = ({ CVList }: { CVList: CVCurrent[] }) => {
  const CVRef = useRef(null);

  const handleDownload = async () => {
    if (CVRef.current) {
      const canvas = await html2canvas(CVRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cv.pdf');
    }
  };

  return (
    <Grid container spacing={2}>
      {CVList.map((item, index) => (
        <Grid item xs={3} key={index}>
          <Box
            sx={{
              position: 'relative',
              height: '300px',
              width: '100%',
              zIndex: 2,
              overflow: 'hidden',
              borderRadius: 1,
              '&:hover .background-image': {
                transform: 'scale(1.1)'
              }
            }}
          >
            <Box
              className="background-image"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(89, 171, 217, 1)), url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                transition: 'transform 0.3s ease-in-out',
                zIndex: 1
              }}
            />
            <Stack
              direction="column"
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                right: 8,
                zIndex: 3,
                color: 'black',
                mb: 1.5
              }}
              px={1}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '19px',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  {item.name}
                </Typography>
                <StyledLink href={'/create-cv/' + item.id}>
                  <IconButton>
                    <EditIcon
                      sx={{
                        fontSize: '19px',
                        color: 'white',
                        borderRadius: '50%',
                        backgroundColor: '#969CA4',
                        padding: '2px',
                        border: '2px solid #969CA4'
                      }}
                    />
                  </IconButton>
                </StyledLink>
              </Stack>
              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 400,
                  fontSize: '15px',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Cập nhật lần cuối {formatDate(item.updatedAt, 'dd/MM/yyyy - hh:mm')}
              </Typography>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserCVList;

// <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} pt={1}>
//   <Stack direction="row" spacing={1}>
//     <Button
//       sx={{
//         color: '#FFFFFF',
//         fontWeight: 700,
//         fontSize: '12px',
//         fontFamily: 'Inter, sans-serif',
//         borderRadius: 30,
//         backgroundColor: '#AAD4EB',
//         '&:hover': {
//           backgroundColor: '#59ABD9'
//         }
//       }}
//     >
//       <ShareIcon
//         sx={{
//           fontSize: '16px',
//           color: 'white',
//           paddingRight: '2px'
//         }}
//       />
//       Chia sẻ
//     </Button>
//     <Button
//       onClick={handleDownload}
//       sx={{
//         color: '#FFFFFF',
//         fontWeight: 700,
//         fontSize: '12px',
//         fontFamily: 'Inter, sans-serif',
//         borderRadius: 30,
//         backgroundColor: '#AAD4EB',
//         '&:hover': {
//           backgroundColor: '#59ABD9'
//         }
//       }}
//     >
//       <FileDownloadIcon
//         sx={{
//           fontSize: '16px',
//           color: 'white',
//           paddingRight: '2px'
//         }}
//       />
//       Tải Xuống
//     </Button>
//   </Stack>
//   <IconButton>
//     <DeleteOutlineIcon
//       sx={{
//         fontSize: '20px',
//         color: 'white'
//       }}
//     />
//   </IconButton>
// </Stack>
