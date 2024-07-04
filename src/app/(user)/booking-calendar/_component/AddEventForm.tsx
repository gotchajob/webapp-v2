"use client";

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import '@mui/lab';

// third-party
import _ from 'lodash-es';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project imports
import ColorPalette from 'components/application/calendar/ColorPalette';
import { gridSpacing } from 'store/constant';

// types
import { DateRange } from 'types';

// assets
import DateRangeIcon from '@mui/icons-material/DateRange';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { Chip, DialogContentText } from '@mui/material';

// constant
const getInitialValues = (event: FormikValues | null, range: DateRange | null) => {
  const newEvent = {
    title: '',
    description: '',
    color: '#2196f3',
    textColor: '',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date()
  };

  if (event || range) {
    return _.merge({}, newEvent, event);
  }
  return newEvent;
};

// ==============================|| CALENDAR EVENT ADD / EDIT / DELETE ||============================== //

interface AddEventFormProps {
  event: FormikValues | null;
  range: DateRange | null;
  handleDelete: (i: string) => void;
  handleCreate: (d: FormikValues) => void;
  handleUpdate: (i: string, d: FormikValues) => void;
  onCancel: () => void;
}

const CustomerCalendarAddEvent = ({ event, range, handleDelete, handleCreate, handleUpdate, onCancel }: AddEventFormProps) => {
  const theme = useTheme();

  const isCreating = !event;

  const backgroundColor = [
    {
      value: theme.palette.error.main,
      color: '#ED4337',
      label: 'Hủy đặt lịch'
    },
    {
      value: theme.palette.success.dark,
      color: '#198754',
      label: 'Hoàn tất'
    },
    {
      value: theme.palette.warning.dark,
      color: '#FFC107',
      label: 'Đã đặt lịch'
    },
  ];

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
    end: Yup.date().when('start', (start, schema) => start && schema.min(start, 'End date must be later than start date')),
    start: Yup.date(),
    color: Yup.string().max(255),
    textColor: Yup.string().max(255)
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const data = {
          title: values.title,
          description: values.description,
          color: values.color,
          textColor: values.textColor,
          allDay: values.allDay,
          start: values.start,
          end: values.end
        };

        if (event) {
          handleUpdate(event.id, data);
        } else {
          handleCreate(data);
        }

        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredEvents = {
    successful: event?.title === 'Đặt lịch thành công' ? [event] : [],
    scheduled: event?.title === 'Đã đặt lịch' ? [event] : [],
    canceled: event?.title === 'Đã hủy đặt lịch' ? [event] : [],
    completed: event?.title === 'Hoàn tất phỏng vấn' ? [event] : []
  };

  useEffect(() => {
    console.log("Input Event title : ", event?.title);
  }, [event])

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>

        {/* ĐÃ ĐẶT LỊCH */}
        {filteredEvents.scheduled.length > 0 &&
          (<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle variant="subtitle1" sx={{ backgroundColor: `${filteredEvents.scheduled[0].color}`, color: `${filteredEvents.scheduled[0].textColor}` }}>
              Thông tin lịch phỏng vấn từ {formatDate(event?.start)} đến {formatDate(event?.end)}
            </DialogTitle>
            <DialogContent sx={{ paddingX: 3, mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DialogContentText variant='h4'>Tên chuyên gia : Anshan Handgun</DialogContentText>
                  <DialogContentText variant='h4'>Kỹ năng đăng ký phỏng vấn : ReactJS, NodeJS</DialogContentText>
                  <DialogContentText variant='h4'>Tổng tiền : 375.000vnđ</DialogContentText>
                  <DialogContentText variant='h4' sx={{ color: `${event?.color}` }}>Chờ phản hồi từ chuyên gia</DialogContentText>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth
                    multiline
                    rows={3}
                    label="Lý do"
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && (errors.description as string)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DialogContentText variant='subtitle1' sx={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                    Lưu ý :
                  </DialogContentText>
                  <DialogContentText variant='subtitle1' sx={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                    Bạn còn 2 lần hủy lịch phỏng vấn trong tháng này
                  </DialogContentText>
                  <DialogContentText variant='subtitle1' sx={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                    Bạn chỉ có thể hủy lịch phỏng vấn trước 3 ngày
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Button type="submit" variant="contained" color="error" disabled={isSubmitting}>
                    Hủy lịch phỏng vấn
                  </Button>
                </Grid>
                <Grid item>
                  <Button type="button" variant="outlined" onClick={onCancel}>
                    Đóng
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>)}


        {/* ĐÃ ĐẶT LỊCH THÀNH CÔNG */}
        {filteredEvents.successful.length > 0 &&
          (<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle variant="subtitle1" sx={{ backgroundColor: `${filteredEvents.successful[0].color}`, color: `${filteredEvents.successful[0].textColor}` }}>
              Thông tin lịch phỏng vấn từ {formatDate(event?.start)} đến {formatDate(event?.end)}
            </DialogTitle>
            <DialogContent sx={{ paddingX: 3, mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DialogContentText variant='h4'>Tên chuyên gia : Anshan Handgun</DialogContentText>
                  <DialogContentText variant='h4'>Kỹ năng đăng ký phỏng vấn : ReactJS, NodeJS</DialogContentText>
                  <DialogContentText variant='h4'>Tổng tiền : 375.000vnđ</DialogContentText>
                  <DialogContentText variant='h4' sx={{ color: `${event?.color}` }}>Chuyên gia đồng ý phỏng vấn CV</DialogContentText>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth
                    multiline
                    rows={3}
                    label="Lý do"
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && (errors.description as string)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DialogContentText variant='subtitle1' sx={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                    Lưu ý :
                  </DialogContentText>
                  <DialogContentText variant='subtitle1' sx={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                    Bạn còn 2 lần hủy lịch phỏng vấn trong tháng này
                  </DialogContentText>
                  <DialogContentText variant='subtitle1' sx={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                    Bạn chỉ có thể hủy lịch phỏng vấn trước 3 ngày
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Button type="submit" variant="contained" color="error" disabled={isSubmitting}>
                    Hủy lịch phỏng vấn
                  </Button>
                </Grid>
                <Grid item>
                  <Button type="button" variant="outlined" onClick={onCancel}>
                    Đóng
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>)}

        {/* ĐÃ HOÀN TẤT PHỎNG VẤN */}
        {filteredEvents.completed.length > 0 &&
          (<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle variant="subtitle1" sx={{ backgroundColor: `${event?.color}`, color: `${event?.textColor}` }}>
              Thông tin lịch phỏng vấn từ {formatDate(event?.start)} đến {formatDate(event?.end)}
            </DialogTitle>
            <DialogContent sx={{ paddingX: 3, mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DialogContentText variant='h4'>Tên chuyên gia : Anshan Handgun</DialogContentText>
                  <DialogContentText variant='h4'>Kỹ năng đăng ký phỏng vấn : ReactJS, NodeJS</DialogContentText>
                  <DialogContentText variant='h4' sx={{ color: `${event?.color}` }}>Đã thanh toán : 375.000vnđ</DialogContentText>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth
                    multiline
                    rows={3}
                    label="Đánh giá của chuyên gia"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && (errors.description as string)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                </Grid>
                <Grid item>
                  <Button type="button" variant="outlined" onClick={onCancel}>
                    Đóng
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>)}

        {/* ĐÃ HỦY ĐẶT LỊCH */}
        {filteredEvents.canceled.length > 0 &&
          (<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle variant="subtitle1" sx={{ backgroundColor: `${event?.color}`, color: `${event?.textColor}` }}>
              Thông tin lịch phỏng vấn từ {formatDate(event?.start)} đến {formatDate(event?.end)}
            </DialogTitle>
            <DialogContent sx={{ paddingX: 3, mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DialogContentText variant='h4'>Tên chuyên gia : Anshan Handgun</DialogContentText>
                  <DialogContentText variant='h4'>Kỹ năng đăng ký phỏng vấn : ReactJS, NodeJS</DialogContentText>
                  <DialogContentText variant='h4' sx={{ color: `${event?.color}` }}>Đã hủy đặt lịch</DialogContentText>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth
                    multiline
                    rows={3}
                    label="Lý do"
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && (errors.description as string)}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <DialogContentText variant='subtitle1' sx={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                  Lưu ý :
                </DialogContentText>
                <DialogContentText variant='subtitle1' sx={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                  Bạn còn 2 lần hủy lịch phỏng vấn trong tháng này
                </DialogContentText>
                <DialogContentText variant='subtitle1' sx={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                  Đã hoàn trả tiền đặt lịch của bạn về ví
                </DialogContentText>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                </Grid>
                <Grid item>
                  <Button type="button" variant="outlined" onClick={onCancel}>
                    Đóng
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>)}

      </LocalizationProvider>
    </FormikProvider>
  );
};

export default CustomerCalendarAddEvent;
