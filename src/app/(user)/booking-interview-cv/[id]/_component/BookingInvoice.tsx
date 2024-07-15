'use client';

import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { gridSpacing } from 'store/constant';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { StyledLink } from 'components/common/link/styled-link';
import OrderComplete from '../../_component/OrderComplete';
import BookingInformationCard from '../../_component/booking-information-card';
import ExpertBookCard from '../../_component/expert-book-card';

// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

const expertBooking = [
    {
        userId: 1,
        fullName: 'Anshan Handgun',
        avatar: `/assets/images/users/avatar-3.png`,
        email: 'anshan.handgun@example.com',
        yearExperience: 10,
        nationSupport: [{ nation: 'USA' }, { nation: 'Canada' }],
        point: 5,
        bio: 'Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.',
        skills: [{ skill: 'JavaScript' }, { skill: 'React' }]
    }
];

const BookingInformataion = {
    expert: {
        userId: 1,
        fullName: 'Anshan Handgun',
        avatar: `/assets/images/users/avatar-3.png`,
        email: 'anshan.handgun@example.com',
        yearExperience: 10,
        nationSupport: [{ nation: 'USA' }, { nation: 'Canada' }],
        point: 5,
        bio: 'Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.',
        skills: [{ skill: 'JavaScript' }, { skill: 'React' }]
    },
    start: '2024-07-02T09:00:00',
    end: '2024-07-02T10:00:00',
    skillsExpert: [
        { label: 'ReactJS', id: 4 },
        { label: 'React Native', id: 5 }
    ],
    amount: 375000
};

const BookInvoicePage = ({ onBack }: { onBack: () => void }) => {

    const handleClose = () => {
        setComplete(false);
    };

    const [complete, setComplete] = useState(false);

    return (
        <Box px={5}>
            <Grid container spacing={gridSpacing} justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Thông tin đặt lịch</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <BookingInformationCard bookinginfo={BookingInformataion} />
                        </Grid>
                        <Grid item xs={6}>
                            {expertBooking?.map((expert: any, index) => (
                                <Box px={10} key={index}>
                                    <ExpertBookCard expert={expert} />
                                </Box>
                            ))}
                        </Grid>
                        <Grid item xs={12} mt={2} px={10}>
                            <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Button onClick={() => { if (onBack) onBack(); }} color="error" variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                                        Quay lại
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={() => setComplete(true)}>Hoàn thành đặt lịch</Button>
                                    <OrderComplete open={complete} close={handleClose} continueClick={() => { }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BookInvoicePage;
