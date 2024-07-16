'use client';

import React, { useEffect } from 'react';
import { Autocomplete, Chip, TextField, Typography, Grid, Card } from '@mui/material';
import { gridSpacing } from 'store/constant';

const BookingInformationCard = ({ bookinginfo }: { bookinginfo: any }) => {
  useEffect(() => {
    console.log('bookinginfo:', bookinginfo);
  }, [bookinginfo]);

  return (
    <>
      {bookinginfo && (
        <Card
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '12px',
            '&:hover': { borderColor: 'primary.main' }
          }}
        >
          <Grid container spacing={gridSpacing} py={1}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Tên chuyên gia:
              </Typography>
              <Typography variant="body1">{bookinginfo.expert.fullName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Thời điểm đặt lịch:
              </Typography>
              <Typography variant="body1">{`Bắt đầu: ${bookinginfo.start}, Kết thúc: ${bookinginfo.end}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Thời điểm diễn ra buổi phỏng vấn:
              </Typography>
              <Typography variant="body1">{`Bắt đầu: ${bookinginfo.start}, Kết thúc: ${bookinginfo.end}`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Kỹ năng đã chọn để phỏng vấn:
              </Typography>
              <Grid container spacing={1}>
                {bookinginfo.skillsExpert.map((skill: { label: string; id: number }) => (
                  <Grid item key={skill.id}>
                    <Chip label={skill.label} color="primary" sx={{ color: 'white' }} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Tổng tiền phải trả:
              </Typography>
              <Typography variant="body1" color="success.dark">
                {bookinginfo.amount}vnđ
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default BookingInformationCard;
