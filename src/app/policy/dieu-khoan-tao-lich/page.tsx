// material-ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Paper } from '@mui/material';
import { apiServerFetch } from 'package/api/api-fetch';

// assets
const headerBackground = '/assets/images/landing/bg-header.jpg';

// ============================|| SAAS PAGES - PRIVCY POLICY ||============================ //

export default async function Page() {
  const res = await apiServerFetch('/policy', 'GET');
  const policy = res.data;

  const Policy = (id: number) => {
    return policy.find((data: any) => data.id === id).value;
  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${headerBackground})`,
        backgroundSize: '100% 600px',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        textAlign: 'center',
        pt: { xs: 0, md: 3.75 }
      }}
    >
      <Container>
        <Grid container justifyContent="center" spacing={gridSpacing}>
          <Grid item sm={10} md={7} sx={{ mt: { md: 12.5, xs: 2.5 }, mb: { md: 8, xs: 2.5 } }}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  color="white"
                  sx={{
                    fontSize: { xs: '1.8125rem', md: '3.5rem' },
                    fontWeight: 900,
                    lineHeight: 1.4,
                    mt: { xs: 10, md: 'auto' }
                  }}
                >
                  Điều khoản tạo lịch
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 3, p: 3, textAlign: "left" }} component={Paper}>
              <Stack spacing={2} sx={{ textAlign: 'left' }}>
                <Typography variant="h3">Thời Gian Tạo Lịch Phỏng Vấn</Typography>
                <p>
                  Chuyên gia (Expert) chỉ có thể tạo lịch phỏng vấn cách thời điểm hiện tại tối thiểu{' '}
                  <strong>
                    <em>{Policy(10)} phút</em>
                  </strong>
                  .
                </p>
                <Typography variant="h3">Số Lượng Lịch Phỏng Vấn Được Tạo</Typography>
                <p>Chuyên gia có thể tạo nhiều lịch phỏng vấn trong cùng một ngày, miễn là các thời gian phỏng vấn không trùng lặp.</p>

                <Typography variant="h3">Hủy Lịch Phỏng Vấn</Typography>
                <p>
                  Chuyên gia có thể hủy lịch phỏng vấn nhưng phải thực hiện trước khi buổi phỏng vấn diễn ra ít nhất{' '}
                  <strong>
                    <em>{Policy(6)} phút</em>
                  </strong>
                  .
                </p>
                <p>Nếu chuyên gia muốn hủy phỏng vấn, họ phải thực hiện điều này qua hệ thống</p>
                <Typography variant="h3">Trách Nhiệm Khi Tạo Lịch Phỏng Vấn</Typography>
                <p>
                  Chuyên gia chịu trách nhiệm đảm bảo lịch phỏng vấn được thực hiện theo đúng thời gian đã đặt và không gây ảnh hưởng đến
                  thời gian của khách hàng.
                </p>
                <p>
                  Nếu chuyên gia không thể tham gia buổi phỏng vấn đã được lên lịch, cần phải từ chối yêu cầu phỏng vấn{' '}
                  <strong>
                    <em>{Policy(12)} phút</em>
                  </strong>{' '}
                  buổi phỏng vấn diễn ra .
                </p>

                <Typography variant="h3">Điều Khoản Về Tín Nhiệm</Typography>
                <p>
                  Chuyên gia hủy lịch phỏng vấn quá{' '}
                  <strong>
                    <em>{Policy(34)} lần</em>
                  </strong>{' '}
                  trong một tháng sẽ bị trừ điểm tín nhiệm.
                </p>
                <p>
                  Nếu chuyên gia không xác nhận lịch phỏng vấn đúng thời hạn trước{' '}
                  <strong>
                    <em>{Policy(12)} phút</em>
                  </strong>{' '}
                  trước khi buổi phỏng vấn diễn ra, sẽ bị tính vào lần không xác nhận và bị trừ điểm tín nhiệm
                </p>

                <Typography variant="h3">Lưu Trữ Thông Tin Phỏng Vấn</Typography>
                <p>
                  Chuyên gia cần lưu lại các thông tin liên quan đến buổi phỏng vấn (bao gồm ghi âm, câu hỏi của khách hàng, hoặc các tài
                  liệu tham khảo khác) để có thể sử dụng trong trường hợp khiếu nại.
                </p>

                <Typography variant="h3">Quy Định Thời Gian Phỏng Vấn</Typography>
                <p>
                  Thời gian phỏng vấn diễn ra ít nhất{' '}
                  <strong>
                    <em>{Policy(14)} phút</em>
                  </strong>{' '}
                  và tối đa{' '}
                  <strong>
                    <em>{Policy(15)} phút</em>
                  </strong>
                  . Nếu buổi phỏng vấn kết thúc sớm hơn hoặc muộn hơn khung thời gian quy định mà không có lý do hợp lý, chuyên gia có thể
                  bị trừ điểm tín nhiệm.
                </p>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
