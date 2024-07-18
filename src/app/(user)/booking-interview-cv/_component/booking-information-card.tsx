'use client';

import { Card, Chip, Grid, Typography } from '@mui/material';
import { useGetAvailability, useGetAvailabilityById } from 'hooks/use-get-availability';
import { useGetCVById } from 'hooks/use-get-cv';
import { useGetExpertProfile } from 'hooks/use-get-expert-profile';
import { useGetExpertSkillOptions } from 'hooks/use-get-expert-skill-option';
import { CustomerToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import { formatDate } from 'package/util';
import { useEffect, useMemo } from 'react';
import { gridSpacing } from 'store/constant';

const BookingInformationCard = ({ bookingInfo, params }: { bookingInfo: any, params: { id: string } }) => {
  const { refresh, refreshTime } = useRefresh();

  const { customerToken } = CustomerToken();

  const { availability } = useGetAvailabilityById({ id: bookingInfo?.availabilityId });

  const { expert, loading: expertLoading } = useGetExpertProfile({ id: +params?.id }, refreshTime);

  const { expertSkillOptions } = useGetExpertSkillOptions({ expertId: +params?.id })

  const selectedSkills = useMemo(() => {
    return expertSkillOptions?.filter(skill =>
      bookingInfo?.bookingSkill?.includes(skill.id)
    );
  }, [expertSkillOptions, bookingInfo, params.id]);

  return (
    <>
      {bookingInfo && (
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
              <Typography variant="body1">{expert?.firstName} {expert?.lastName}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Thời điểm diễn ra buổi phỏng vấn:
              </Typography>
              {availability && (
                <>
                  <Typography variant="body1">Bắt đầu: {formatDate(availability.startTime, "dd/MM/yyyy - hh:mm")} </Typography>
                  <Typography variant="body1">Kết thúc: {formatDate(availability.endTime, "dd/MM/yyyy - hh:mm")}</Typography>
                </>)}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Chú thích thêm:
              </Typography>
              <Typography variant="body1">{bookingInfo.note ? bookingInfo.note : "Không có chú thích"}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Kỹ năng đã chọn để phỏng vấn:
              </Typography>
              <Grid container spacing={1}>
                {selectedSkills?.map((skill) => (
                  <Grid item key={skill.id}>
                    <Chip label={skill.skillOptionName} color="primary" sx={{ color: 'white' }} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Tổng tiền phải trả:
              </Typography>
              <Typography variant="body1" color="success.dark">
                375.000vnđ
              </Typography>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default BookingInformationCard;
