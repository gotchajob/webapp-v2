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
                  Đăng kí chuyên gia
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 3, p: 3, textAlign: "left" }} component={Paper}>
              <div dangerouslySetInnerHTML={{ __html: innerHtml }}></div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const innerHtml = `<h3><strong>Chính sách đăng ký và quản lý Chuyên gia (Expert) tại Gotcha Job</strong></h3> <h4>1. <strong>Yêu cầu đăng ký</strong></h4> <ul> <li><strong>Cung cấp thông tin chi tiết</strong>: Để trở thành Chuyên gia (Expert) trên nền tảng Gotcha Job, ứng viên cần hoàn thành biểu mẫu đăng ký với các thông tin chi tiết, bao gồm nhưng không giới hạn ở:</li> <ul> <li><strong>Họ và tên</strong>: Tên đầy đủ phải trùng khớp với tên trên các giấy tờ cá nhân hoặc hồ sơ chuyên môn.</li> <li><strong>Địa chỉ email</strong>: Địa chỉ email cá nhân, thường xuyên sử dụng để phục vụ cho các mục đích liên lạc và xác minh.</li> <li><strong>Số điện thoại</strong>: Số điện thoại liên hệ chính thức, được sử dụng để thông báo về các thay đổi, cập nhật hoặc khi có vấn đề phát sinh trong quá trình cung cấp dịch vụ.</li> <li><strong>Kinh nghiệm làm việc và kỹ năng chuyên môn</strong>: Mô tả chi tiết về kinh nghiệm làm việc, ngành nghề và lĩnh vực chuyên môn mà Chuyên gia đang hoạt động. Những thông tin này giúp nền tảng đánh giá chất lượng và năng lực của Chuyên gia, đồng thời giúp khách hàng chọn lựa phù hợp.</li> <li><strong>Tài liệu và chứng chỉ liên quan</strong>: Trong trường hợp yêu cầu, Chuyên gia cần cung cấp các tài liệu hoặc chứng chỉ chứng minh về năng lực chuyên môn (chẳng hạn như bằng cấp, giấy chứng nhận đào tạo hoặc kinh nghiệm làm việc tại các tổ chức có uy tín).</li> </ul> <li><strong>Quy trình xác minh</strong>: Sau khi Chuyên gia hoàn thành đăng ký, Gotcha Job sẽ tiến hành quy trình xác minh thông tin. Quy trình này bao gồm việc kiểm tra tính chính xác của các tài liệu được nộp và xác thực danh tính của Chuyên gia, nhằm đảm bảo sự tin cậy và chất lượng của dịch vụ mà họ cung cấp.</li> </ul> <h4>2. <strong>Điểm tín nhiệm và cơ chế hoạt động</strong></h4> <ul> <li><strong>Điểm tín nhiệm ban đầu</strong>: Khi được phê duyệt và chấp thuận tham gia nền tảng Gotcha Job, Chuyên gia sẽ được cấp <strong>điểm tín nhiệm</strong>. Điểm tín nhiệm này là cơ sở để đo lường sự uy tín, độ tin cậy và chất lượng của Chuyên gia dựa trên các hoạt động và phản hồi của người dùng trong quá trình làm việc.</li> <li><strong>Hệ thống quản lý điểm tín nhiệm</strong>:</li> <ul> <li><strong>Tăng điểm tín nhiệm</strong>: Điểm tín nhiệm của Chuyên gia có thể tăng dựa trên các yếu tố như đánh giá tích cực từ người dùng sau mỗi buổi phỏng vấn, sự chuyên nghiệp trong công việc và tuân thủ các quy định của nền tảng. Việc đạt được những mốc điểm tín nhiệm cao sẽ mang lại lợi ích cho Chuyên gia, như được ưu tiên phân công công việc hoặc các quyền lợi đặc biệt.</li> <li><strong>Giảm điểm tín nhiệm</strong>: Nếu Chuyên gia vi phạm các chính sách của nền tảng (chẳng hạn như hủy lịch không hợp lệ, không xác nhận phỏng vấn hoặc nhận phản hồi tiêu cực từ khách hàng), điểm tín nhiệm sẽ bị trừ. Mỗi lần vi phạm sẽ có mức trừ điểm tương ứng, và Gotcha Job sẽ theo dõi các hành vi vi phạm để đưa ra biện pháp xử lý.</li> </ul> <li><strong>Khóa tài khoản</strong>: Trong trường hợp điểm tín nhiệm của Chuyên gia giảm xuống dưới, tài khoản của họ sẽ bị tạm khóa. Chuyên gia sẽ không thể cung cấp dịch vụ hoặc truy cập vào các chức năng liên quan cho đến khi có biện pháp khắc phục phù hợp (như giải quyết khiếu nại hoặc cải thiện dịch vụ). Quá trình khôi phục điểm tín nhiệm sẽ được quản lý nghiêm ngặt bởi Gotcha Job và có thể yêu cầu chứng minh tính chất không cố ý của các vi phạm.</li> </ul> <h4>3. <strong>Chính sách thanh toán</strong></h4> <ul> <li><strong>Cơ chế thanh toán</strong>: Sau khi hoàn thành buổi phỏng vấn hoặc dịch vụ thành công mà không có khiếu nại từ phía người dùng, Chuyên gia sẽ nhận được thanh toán từ hệ thống Gotcha Job. Quá trình thanh toán được thực hiện tự động và số tiền sẽ được chuyển vào tài khoản của Chuyên gia trong hệ thống.</li> <li><strong>Tiền nhận từ hệ thống</strong>: Chuyên gia sẽ nhận được phần trăm giá trị phí dịch vụ đã thỏa thuận cho mỗi buổi phỏng vấn, trong khi hoa hồng còn lại sẽ được giữ lại như phí dịch vụ của Gotcha Job.</li> <li><strong>Thời gian thanh toán</strong>: Tiền sẽ được tự động chuyển vào tài khoản của Chuyên gia trong vòng <strong>24 giờ</strong> sau khi buổi phỏng vấn được hoàn thành và không có khiếu nại. Trường hợp có khiếu nại từ người dùng, quá trình thanh toán sẽ tạm hoãn cho đến khi vấn đề được giải quyết.</li> </ul> <h4>4. <strong>Quy định về khiếu nại và xử lý tranh chấp</strong></h4> <ul> <li><strong>Quản lý khiếu nại</strong>: Trong trường hợp có khiếu nại từ người dùng liên quan đến dịch vụ của Chuyên gia, Gotcha Job sẽ tiến hành điều tra và xem xét các thông tin liên quan. Chuyên gia có trách nhiệm cung cấp đầy đủ các tài liệu hoặc thông tin liên quan đến buổi phỏng vấn (chẳng hạn như bản ghi âm, câu hỏi từ phía người dùng) trong thời gian quy định.</li> <li><strong>Xử lý khiếu nại</strong>:</li> <ul> <li><strong>Khiếu nại hợp lệ</strong>: Nếu khiếu nại của người dùng được xác định là hợp lệ (chẳng hạn do lỗi của Chuyên gia trong quá trình cung cấp dịch vụ), Chuyên gia sẽ không được nhận thanh toán cho buổi phỏng vấn đó và điểm tín nhiệm sẽ bị trừ.</li> <li><strong>Khiếu nại không hợp lệ</strong>: Nếu khiếu nại bị từ chối hoặc không được chứng minh là hợp lệ, người dùng sẽ không được hoàn tiền và Chuyên gia vẫn nhận được thanh toán như bình thường.</li> </ul> <li><strong>Quy trình giải quyết</strong>: Cả Chuyên gia và người dùng đều có thể gửi thêm bằng chứng để hỗ trợ cho việc giải quyết tranh chấp. Gotcha Job sẽ cố gắng giải quyết mọi vấn đề trong thời gian nhanh nhất, nhưng tối đa không quá <strong>7 ngày làm việc</strong> kể từ khi nhận được khiếu nại.</li> </ul> <h4>5. <strong>Cập nhật chính sách</strong></h4> <p>Gotcha Job có quyền thay đổi, bổ sung hoặc sửa đổi chính sách này bất kỳ lúc nào để phù hợp với sự phát triển của nền tảng và yêu cầu của người dùng. Mọi thay đổi sẽ được thông báo trước ít nhất <strong>30 ngày</strong> trước khi có hiệu lực. Chuyên gia có trách nhiệm theo dõi và cập nhật các chính sách mới để đảm bảo tuân thủ đầy đủ các quy định hiện hành.&nbsp;</p>
`