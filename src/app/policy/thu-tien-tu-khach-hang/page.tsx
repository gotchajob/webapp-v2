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
                  Chính sách thu tiền phí dịch vụ
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 3, p: 3, textAlign: 'left' }} component={Paper}>
              <p>
                Tất cả các giao dịch thu tiền từ khách hàng khi đăng ký dịch vụ Mock Interview trên website sẽ được xử lý thông qua các cổng
                thanh toán an toàn và được mã hóa để bảo vệ thông tin cá nhân của quý khách. Quý khách có thể thanh toán bằng các phương
                thức: ví điện tử hoặc chuyển khoản ngân hàng. Tất cả các khoản thanh toán đều được tính bằng <strong>VND</strong> và bao gồm
                các khoản thuế áp dụng.
              </p>
              <Stack spacing={2} sx={{ textAlign: 'left' }}>
                <Typography variant="h3">Hủy Bỏ Giao Dịch</Typography>
                <p>
                  Quý khách không thể hủy bỏ hoặc hoàn trả dịch vụ Mock Interview nếu thời gian hủy cách ngày/giờ phỏng vấn ít hơn{' '}
                  <strong>{Policy(6)} phút</strong>. Trong trường hợp hủy dịch vụ trước thời hạn quy định, hệ thống sẽ hoàn trả tiền vào ví
                  Gotchajob của khách hàng Nếu khách hàng hủy buổi phỏng vấn quá <strong>{Policy(33)} lần trong 1 tháng</strong>, tài khoản
                  của quý khách sẽ bị khóa quyền hủy dịch vụ.
                </p>
                <Typography variant="h3">Chính Sách Hoàn Tiền</Typography>
                <p>
                  Hoàn tiền chỉ áp dụng trong trường hợp dịch vụ không thể cung cấp đúng như mô tả hoặc khi report của khách hàng đối với
                  expert được duyệt. Thời gian xử lý yêu cầu hoàn tiền có thể kéo dài từ <strong>7 đến 14 ngày làm việc</strong> kể từ ngày
                  tiếp nhận yêu cầu. Nếu report không được duyệt, quý khách sẽ không được hoàn tiền.
                </p>
                <Typography variant="h3">Bảo Mật Thông Tin</Typography>
                <p>
                  Chúng tôi cam kết bảo vệ và giữ kín mọi thông tin cá nhân mà quý khách cung cấp trong quá trình thanh toán. Thông tin này
                  sẽ không được chia sẻ với bất kỳ bên thứ ba nào, trừ khi cần thiết để hoàn thành giao dịch hoặc tuân thủ các quy định pháp
                  luật.
                </p>
                <Typography variant="h3">Trách nhiệm của khách hàng</Typography>
                <p>
                  Quý khách chịu trách nhiệm cung cấp thông tin chính xác, video, ghi âm và đầy đủ khi thực hiện báo cáo buổi phỏng vấn.
                  Chúng tôi không chịu trách nhiệm đối với các sai sót do quý khách cung cấp thông tin không chính xác hoặc do không thực
                  hiện đúng quy trình báo cáo buổi phỏng vấn.
                </p>
                <p>
                  {' '}
                  Chúng tôi không chịu trách nhiệm đối với các sai sót do quý khách do không thực hiện đúng quy trình hủy lịch trong thời
                  gian quy định.
                </p>
                <Typography variant="h3">Liên Hệ Hỗ Trợ</Typography>
                <p>
                  Nếu quý khách gặp bất kỳ vấn đề nào liên quan đến thanh toán hoặc dịch vụ Mock Interview, vui lòng liên hệ với chúng tôi
                  qua email:
                  <a href="mailto:gotchajob.vn@gmail.com">gotchajob.vn@gmail.com</a> hoặc số điện thoại{' '}
                  <a href="tel:+84941244285">+84 0941 244 285</a> để được hỗ trợ kịp thời.
                </p>
                <p>
                  Quý khách vui lòng xem xét kỹ các điều khoản trên trước khi tiến hành thanh toán và đặt lịch phỏng vấn. Khi nhấn nút "
                  <strong>Đồng Ý Thanh Toán</strong>", quý khách đã đồng ý với các điều khoản này.
                </p>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
