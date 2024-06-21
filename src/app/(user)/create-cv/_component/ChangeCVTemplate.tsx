'use client';

// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { Box } from '@mui/material';

const ChangeCVTemplate = () => {
    return (
        <MainCard title="Đổi mẫu CV" sx={{ width: "100%", height: "100%" }}>
        </MainCard>
    );
}

export default ChangeCVTemplate;
