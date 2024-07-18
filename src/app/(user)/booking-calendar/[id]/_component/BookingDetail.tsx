// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import { format } from 'date-fns';

// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// types
import { ThemeMode } from 'types/config';
import { useEffect, useMemo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { formatDate } from 'package/util';
import { useGetExpertSkillOptions } from 'hooks/use-get-expert-skill-option';
import { useRefresh } from 'hooks/use-refresh';
import { useGetExpertProfile } from 'hooks/use-get-expert-profile';

const renderEventDetails = (event: any) => {
    switch (event?.extendedProps.status) {
        case 1:
            return (
                <>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Tổng tiền :</Typography>
                        <Typography variant="body2">375.000vnđ</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Trạng thái :</Typography>
                        <Chip
                            label="wait to expert accept"
                            variant="outlined"
                            size="small"
                            chipcolor='primary'
                        />
                    </Stack>
                </>
            );
        case 2:
            return (
                <>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Tổng tiền :</Typography>
                        <Typography variant="body2">375.000vnđ</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Trạng thái :</Typography>
                        <Chip
                            label={event?.title}
                            variant="outlined"
                            size="small"
                            sx={{
                                backgroundColor: `${event.color}`,
                                color: '#ffffff',
                                borderColor: `${event.color}`,
                                '&:hover': {
                                    backgroundColor: `${event.color}`,
                                    borderColor: `${event.color}`,
                                    cursor: 'default',
                                },
                            }}
                        />
                    </Stack>
                </>
            );
        case 5:
            return (
                <>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Đã thanh toán :</Typography>
                        <Typography variant="body2">375.000vnđ</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Trạng thái :</Typography>
                        <Chip
                            label={event?.title}
                            variant="outlined"
                            size="small"
                            sx={{
                                backgroundColor: `${event.color}`,
                                color: '#ffffff',
                                borderColor: `${event.color}`,
                                '&:hover': {
                                    backgroundColor: `${event.color}`,
                                    borderColor: `${event.color}`,
                                    cursor: 'default',
                                },
                            }}
                        />
                    </Stack>
                </>
            );
        case 6:
            return (
                <>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Đã hoàn trả :</Typography>
                        <Typography variant="body2">375.000vnđ</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Trạng thái :</Typography>
                        <Chip
                            label={event?.title}
                            variant="outlined"
                            size="small"
                            sx={{
                                backgroundColor: `${event.color}`,
                                color: '#ffffff',
                                borderColor: `${event.color}`,
                                '&:hover': {
                                    backgroundColor: `${event.color}`,
                                    borderColor: `${event.color}`,
                                    cursor: 'default',
                                },
                            }}
                        />
                    </Stack>
                </>
            );
        case 7:
            return (
                <>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Đã hoàn trả :</Typography>
                        <Typography variant="body2">375.000vnđ</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="subtitle1">Trạng thái :</Typography>
                        <Chip
                            label={event?.title}
                            variant="outlined"
                            size="small"
                            sx={{
                                backgroundColor: `${event.color}`,
                                color: '#ffffff',
                                borderColor: `${event.color}`,
                                '&:hover': {
                                    backgroundColor: `${event.color}`,
                                    borderColor: `${event.color}`,
                                    cursor: 'default',
                                },
                            }}
                        />
                    </Stack>
                </>
            );
        default:
            return null;
    }
};

const BookingDetailPage = ({ event, onBack }: { event: any, onBack: () => void }) => {
    const theme = useTheme();

    const { refresh, refreshTime } = useRefresh();

    const [cancelReason, setCancelReason] = useState('');

    const [showCancelForm, setShowCancelForm] = useState(false);

    const { expertSkillOptions } = useGetExpertSkillOptions({ expertId: event?.extendedProps.expertId });

    const { expert, loading: expertLoading } = useGetExpertProfile({ id: event?.extendedProps.expertId }, refreshTime);

    const handleCancelClick = () => {
        setShowCancelForm(true);
    };

    const handleConfirmCancel = () => {
        console.log('Cancelled with reason:', cancelReason);
        setCancelReason('');
        setShowCancelForm(false);
    };

    const handleCloseCancelForm = () => {
        setCancelReason('');
        setShowCancelForm(false);
    };

    useEffect(() => {
        console.log("event :", event);
    }, [event, expert]);

    const selectedSkills = useMemo(() => {
        return expertSkillOptions?.filter(skill =>
            event?.extendedProps.expertSkillOptionId.includes(skill.id)
        );
    }, [expertSkillOptions, event]);

    return (
        <Grid container spacing={gridSpacing} px={5}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Typography variant="body2">
                                    Thông tin buổi phỏng vấn vào :
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    {formatDate(event?.start, "dd/MM/yyyy hh:mm")}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    ━
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    {formatDate(event?.end, "dd/MM/yyyy hh:mm")}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Stack spacing={2}>
                                    <Typography variant="h4">Thông tin chuyên gia</Typography>
                                    <Stack spacing={0}>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Tên chuyên gia :</Typography>
                                            <Typography variant="body2">{expert?.firstName} {expert?.lastName}</Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Năm kinh nghiệm :</Typography>
                                            <Typography variant="body2">{expert?.yearExperience}</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Stack spacing={2}>
                                    <Typography variant="h4">Buổi phỏng vấn</Typography>
                                    <Stack spacing={0}>
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Kỹ năng phỏng vấn :</Typography>
                                            {selectedSkills?.map((skill) => (
                                                <Grid item key={skill.id}>
                                                    <Chip label={skill.skillOptionName} chipcolor='primary' />
                                                </Grid>
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Stack spacing={0} sx={{ mt: { xs: 0, md: 3 } }}>
                                    {renderEventDetails(event)}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    {event?.extendedProps.status === 5 &&
                        (<> <Grid item xs={12}>
                            <Divider />
                        </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item sm={6} md={4}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Đánh giá CV</Typography>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Đánh giá chung :</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">CV của Joseph William rất rõ ràng và có cấu trúc. Thông tin cá nhân được cung cấp đầy đủ và chi tiết.</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Thông tin cá nhân :</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">Thông tin liên hệ và địa chỉ được ghi rõ và dễ hiểu.</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">Trình độ học vấn :</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">Thông tin về học vấn được trình bày một cách logic và có thứ tự.</Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>

                                    <Grid item sm={6} md={4}>
                                        <Stack spacing={2}>
                                            <Typography variant="h4">Đánh giá kỹ năng</Typography>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">NodeJS :</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">
                                                        Kỹ năng NodeJS của Joseph William được phản ánh một cách rõ ràng trong CV. Anh ấy có khả năng vận dụng NodeJS để giải quyết các vấn đề phức tạp và xây dựng các ứng dụng hiệu quả.
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="subtitle1">ReactJS :</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={1}>
                                                    <Typography variant="body2">
                                                        Kỹ năng ReactJS của Joseph William cũng được mô tả chi tiết trong CV. Anh ấy có khả năng thiết kế và phát triển giao diện người dùng đáp ứng yêu cầu cao bằng ReactJS.
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Grid></>)}

                    <Grid item xs={12} mt={1}>
                        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Button onClick={() => { if (onBack) onBack(); }} variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                                    Quay lại
                                </Button>
                            </Grid>
                            <Grid item>
                                {event?.extendedProps.canCancel && (<Button variant="contained" onClick={handleCancelClick}>Hủy đặt lịch</Button>)}
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Lý do hủy đặt lịch */}
                    {showCancelForm && (
                        <Grid item xs={12} mt={1}>
                            <SubCard>
                                <Stack spacing={2}>
                                    <Typography variant="subtitle1">Nhập lý do hủy đặt lịch:</Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                    />
                                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                                        <Button variant="outlined" onClick={handleCloseCancelForm}>
                                            Đóng
                                        </Button>
                                        <Button variant="contained" onClick={handleConfirmCancel}>
                                            Xác nhận
                                        </Button>
                                    </Stack>
                                </Stack>
                            </SubCard>
                        </Grid>
                    )}

                </Grid>

            </Grid>

        </Grid>
    );
};

export default BookingDetailPage;
