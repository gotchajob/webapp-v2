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
import { formatNumber } from 'package/util';

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
                  Chính Sách Sửa Đổi Giá Dịch Vụ và Thanh Toán Cho Chuyên Gia
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 3, p: 3, textAlign: "left" }} component={Paper}>
              <Stack spacing={2} sx={{ textAlign: 'left' }}>
                <Typography variant="h3">Sửa Đổi Giá Dịch Vụ</Typography>
                <p>
                  Chuyên gia có thể thay đổi giá dịch vụ phỏng vấn của mình, tuy nhiên, giá dịch vụ không được vượt quá{' '}
                  <strong>{formatNumber(+Policy(21))} VND</strong> cho mỗi buổi phỏng vấn và không được thấp hơn{' '}
                  <strong>{formatNumber(+Policy(20))} VND</strong> cho mỗi buổi phỏng vấn. Việc thay đổi giá phải tuân thủ đúng quy định và
                  chính sách của hệ thống, đảm bảo tính cạnh tranh và công bằng trong việc cung cấp dịch vụ.
                </p>

                <Typography variant="h3">Phần Trăm Thu Nhập Từ Buổi Phỏng Vấn</Typography>
                <p>
                  Chuyên gia sẽ nhận được <strong>{100 - Policy(18)}%</strong> số tiền của mỗi buổi phỏng vấn thành công. Phần còn lại sẽ
                  được giữ lại để trang trải các chi phí vận hành của hệ thống. Tiền sẽ được tự động cộng vào ví tiền của chuyên gia sau khi
                  buổi phỏng vấn kết thúc và không có khiếu nại nào từ khách hàng.
                </p>

                <Typography variant="h3">Quy Định Về Rút Tiền</Typography>
                <p>
                  Chuyên gia vui lòng điền đúng và đầy đủ thông tin ngân hàng trong mục "Thông Tin Ngân Hàng" khi tạo yêu cầu rút tiền. Hệ
                  thống sẽ không chịu trách nhiệm với các lỗi giao dịch phát sinh do thông tin ngân hàng không chính xác. Để rút tiền từ ví
                  tiền của mình, chuyên gia vui lòng truy cập vào mục "<strong>Tạo Yêu Cầu Rút Tiền</strong>" trong hệ thống và làm theo các
                  bước hướng dẫn để chuyển tiền vào tài khoản ngân hàng.
                </p>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
