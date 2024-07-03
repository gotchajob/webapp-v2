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

  useEffect(() => {
    console.log("Nhận event:", event);
  }, [event])

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>
            Thông tin lịch phỏng vấn từ {formatDate(event?.start)} đến {formatDate(event?.end)}
          </DialogTitle>
          <DialogContent sx={{ paddingX: 3, mt: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <DialogContentText variant='subtitle1'>Tên chuyên gia : Anshan Handgun</DialogContentText>
                <DialogContentText variant='subtitle1'>Kỹ năng phỏng vấn : ReactJS, NodeJS</DialogContentText>
                <DialogContentText variant='subtitle1'>Đánh giá của chuyên gia : kiến thức chuyên môn tốt</DialogContentText>
                <DialogContentText variant='subtitle1'>Đã thanh toán : 375.000vnđ</DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Lý do"
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && (errors.description as string)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ paddingX: 3, paddingBottom: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
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
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
};

export default CustomerCalendarAddEvent;
