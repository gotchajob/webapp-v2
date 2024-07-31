'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FlexBetween, FlexCenter } from 'components/common/box/flex-box';
import { ServiceCard } from './_components/service-card';

const data = [
  {
    title: '6s',
    content: 'là thời gian nhà tuyển dụng Scan CV và chỉ có 20% ứng viên được gọi phỏng vấn.'
  },
  {
    title: '50%',
    content: 'sinh viên vừa tốt nghiệp đánh mất cơ hội có được công việc mơ ước vì mắc lỗi viết CV.'
  },
  {
    title: '50%',
    content: 'sinh viên vừa tốt nghiệp loay hoay với lộ trình thăng tiến của bản thân.'
  }
];

const ReviewCVPage = () => {
  return (
    <ServiceCard />
    //   <Box py={9} px={20}>
    //     <Box
    //       sx={{
    //         width: '100%',
    //         height: '500px',
    //         position: 'relative',
    //         zIndex: 1,
    //         borderRadius: 2,
    //         backgroundImage: 'linear-gradient(to right bottom, #AAD4EB, #00CCFF, #0980C3)',
    //         textAlign: 'center'
    //       }}
    //     >
    //       <Stack
    //         spacing={5}
    //         sx={{
    //           width: '100%',
    //           position: 'absolute',
    //           zIndex: 2,
    //           top: '50%',
    //           left: '50%',
    //           transform: 'translate(-50%, -50%)'
    //         }}
    //       >
    //         <Typography
    //           sx={{
    //             color: '#F3F5F7',
    //             fontWeight: 700,
    //             fontSize: '28px',
    //             fontFamily: 'Inter, sans-serif',
    //             textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    //           }}
    //         >
    //           Những con số biết nói
    //         </Typography>
    //         <Stack direction="row" spacing={4} justifyContent="center">
    //           {data.map((item, index) => (
    //             <Box
    //               key={index}
    //               sx={{
    //                 width: '300px',
    //                 height: '200px',
    //                 backgroundColor: '#FFFFFF',
    //                 padding: 2,
    //                 borderRadius: 2,
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    //               }}
    //             >
    //               <Typography
    //                 sx={{
    //                   backgroundImage: 'linear-gradient(to right bottom, #AAD4EB, #00CCFF, #0980C3)',
    //                   WebkitBackgroundClip: 'text',
    //                   backgroundClip: 'text',
    //                   color: 'transparent',
    //                   fontWeight: 700,
    //                   fontSize: '32px',
    //                   fontFamily: 'Inter, sans-serif',
    //                   textAlign: 'center',
    //                   margin: 2
    //                 }}
    //               >
    //                 {item.title}
    //               </Typography>
    //               <Typography
    //                 sx={{
    //                   fontSize: '16px',
    //                   fontFamily: 'Inter, sans-serif',
    //                   textAlign: 'center',
    //                   lineHeight: 1.6
    //                 }}
    //               >
    //                 {item.content}
    //               </Typography>
    //             </Box>
    //           ))}
    //         </Stack>
    //         <Stack pt={1} spacing={1}>
    //           <Typography
    //             sx={{
    //               color: '#F3F5F7',
    //               fontSize: '18px',
    //               fontFamily: 'Inter, sans-serif',
    //               textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    //             }}
    //           >
    //             Bạn có thể thử, có thể sai, nhưng đừng mãi phí hoài thời gian, đánh mất cơ hội
    //           </Typography>
    //           <Typography
    //             sx={{
    //               color: '#F3F5F7',
    //               fontWeight: 700,
    //               fontSize: '18px',
    //               fontFamily: 'Inter, sans-serif',
    //               textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
    //             }}
    //           >
    //             Đi đúng hướng cùng GotchaJob ngay hôm nay!
    //           </Typography>
    //         </Stack>
    //       </Stack>
    //     </Box>
    //   </Box>
    // </>
  );
};

export default ReviewCVPage;
