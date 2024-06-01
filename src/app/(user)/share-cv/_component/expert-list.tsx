'use client';

// material-ui
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

// project imports
import { gridSpacing } from 'store/constant';
import { ThemeMode } from 'types/config';
import ExpertDetailCard from './expert-detail-card';
import { Box } from '@mui/material';

// assets

// types


const experts_data = [
    {
        id: '#1Card_Phoebe',
        avatar: 'avatar-2.png',
        name: 'Gaetano',
        role: 'Investor Division Strategist',
        about: 'Try to connect the SAS transmitter, maybe it will index the optical hard drive!',
        email: 'alia_shields25@yahoo.com',
        contact: '253-418-5940',
        location: 'Mỹ'
    }, {
        id: '#9Card_Madyson',
        avatar: 'avatar-5.png',
        name: 'Jane',
        role: 'Investor Division Strategist',
        about: 'Try to connect the SAS transmitter, maybe it will index the optical hard drive!',
        email: 'alia_shields25@yahoo.com',
        contact: '253-418-5940',
        location: 'Nga'
    }, {
        id: '#6Card_Joanne',
        avatar: 'avatar-6.png',
        name: 'Joanne',
        role: 'Investor Division Strategist',
        about: 'Try to connect the SAS transmitter, maybe it will index the optical hard drive!',
        email: 'alia_shields25@yahoo.com',
        contact: '253-418-5940',
        location: 'Trung Quốc'
    },
    {
        id: '#4Friends_Henderson',
        avatar: 'avatar-4.png',
        name: 'Henderson',
        role: 'Investor Division Strategist',
        about: 'Try to connect the SAS transmitter, maybe it will index the optical hard drive!',
        email: 'alia_shields25@yahoo.com',
        contact: '253-418-5940',
        location: 'Việt Nam'
    }, {
        id: '#4Followers_Henderson',
        avatar: 'avatar-8.png',
        name: 'Henderson',
        role: 'Investor Division Strategist',
        about: 'Try to connect the SAS transmitter, maybe it will index the optical hard drive!',
        email: 'alia_shields25@yahoo.com',
        contact: '253-418-5940',
        location: 'Triều Tiên'
    }
]

export default function Experts() {
    const theme = useTheme();

    const cardStyle = {
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50',
        border: '1px solid',
        borderColor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.100'
    };

    return (
        <Grid container spacing={gridSpacing}>
            {experts_data?.map((expert, index) => (
                <Grid key={index} item xs={3}>
                    <ExpertDetailCard {...expert} />
                </Grid>
            ))}
            <Grid container item justifyContent='center' alignItems="center" mt={4}>
                <Box>
                    <Pagination count={10} color="primary" size="large" />
                </Box>
            </Grid>
        </Grid>
    );
}