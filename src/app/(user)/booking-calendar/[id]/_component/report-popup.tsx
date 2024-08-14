import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import useSnackbarDialog from 'components/common/snackbar-dialog/snackbar-dialog';
import { useGetReportSuggest } from 'hooks/use-get-report-suggest';
import { CustomerToken } from 'hooks/use-login';
import { PostBookingReport } from 'package/api/booking-report';
import { ReportSuggest } from 'package/api/report-suggest';
import { useState } from 'react';

export const ReportPopup = ({ open, bookingId, handleClose }: { open?: boolean; bookingId?: number; handleClose: () => void }) => {
  const { reportSuggest } = useGetReportSuggest({});
  const [selectedReport, setSelectedReport] = useState<ReportSuggest[]>([]);
  const [content, setContent] = useState<string>('');
  const [evidence, setEvidence] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { SnackbarDialog, showSnackbarDialog } = useSnackbarDialog();
  const { customerToken } = CustomerToken();

  const handleCreateReport = async () => {
    try {
      setIsLoading(true);
      const reportSuggestIds = selectedReport.map((data) => data.id);
      if (bookingId) {
        const res = await PostBookingReport(
          {
            bookingId,
            content,
            evidence,
            reportSuggestIds
          },
          customerToken
        );
      }
      showSnackbarDialog('Gửi yêu cầu thành công', 'success');
    } catch (error: any) {
      showSnackbarDialog('Gửi yêu cầu thất bại', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open || false} maxWidth="sm" fullWidth sx={{ borderRadius: '10px' }}>
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem' }} align="center">
        Nhập thông tin Report
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Autocomplete
            multiple
            options={reportSuggest}
            getOptionLabel={(option) => option.report}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
            onChange={(e, v) => {
              setSelectedReport(v);
            }}
          />
          <TextField
            placeholder="Mô tả đầy đủ thông tin report"
            fullWidth
            multiline
            minRows={3}
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            sx={{ mt: 10 }}
            placeholder="Link gg drive lưu thông tin buổi phỏng vấn"
            fullWidth
            variant="outlined"
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" sx={{ marginRight: 1, fontWeight: 'bold' }}>
          Đóng
        </Button>
        <Button onClick={handleCreateReport} color="primary" sx={{ fontWeight: 'bold' }}>
          Gửi
        </Button>
      </DialogActions>
      <SnackbarDialog />
    </Dialog>
  );
};
