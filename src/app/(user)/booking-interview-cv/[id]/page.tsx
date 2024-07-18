'use client';

import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// assets
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReceiptIcon from '@mui/icons-material/Receipt';

// types
import { TabsProps } from 'types';
import { ThemeMode } from 'types/config';
import ExpertCalendarPage from './_component/ExpertCalendar';
import BookInvoicePage from './_component/BookingInvoice';
import ExpertProfilePage from './_component/ExpertProfile';

// tabs panel
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// tabs option
const tabsOption = [
    {
        label: 'Thông tin chuyên gia',
        icon: <AccountCircleIcon sx={{ fontSize: '1.3rem' }} />,
        caption: 'Thông tin hồ sơ chuyên gia'
    },
    {
        label: 'Chọn lịch phỏng vấn',
        icon: <CalendarMonthIcon sx={{ fontSize: '1.3rem' }} />,
        caption: 'Chọn lịch phỏng vấn của chuyên gia'
    },
    {
        label: 'Đặt lịch',
        icon: <ReceiptIcon sx={{ fontSize: '1.3rem' }} />,
        caption: 'Thông tin đặt lịch phỏng vấn'
    },

];

// ==============================|| EXPERT BOOKING PAGE ||============================== //

const ExpertBookingPage = ({ params }: { params: { id: string } }) => {
    const theme = useTheme();

    const [value, setValue] = useState<number>(0);

    // const handleChange = (event: SyntheticEvent, newValue: number) => {
    //     setValue(newValue);
    // };

    const handleNextStep = () => {
        setValue(prevValue => prevValue + 1);
    }

    const handlePrevStep = () => {
        setValue(prevValue => prevValue - 1);
    }

    return (
        <Box sx={{ boxShadow: 3, my: 5, mx: 5 }}>
            <MainCard>
                <Grid container spacing={gridSpacing} >
                    <Grid item xs={12}>
                        <Tabs
                            value={value}
                            // onChange={handleChange}
                            aria-label="icon label tabs example"
                            variant="scrollable"
                            sx={{
                                '& .MuiTabs-flexContainer': {
                                    borderBottom: 'none'
                                },
                                '& .MuiTabs-indicator': {
                                    display: 'none'
                                },
                                '& .MuiButtonBase-root + .MuiButtonBase-root': {
                                    position: 'relative',
                                    overflow: 'visible',
                                    ml: 2,
                                    '&:after': {
                                        content: '""',
                                        bgcolor: '#ccc',
                                        width: 1,
                                        height: 'calc(100% - 16px)',
                                        position: 'absolute',
                                        top: 8,
                                        left: -8
                                    }
                                }
                            }}
                        >
                            {tabsOption.map((tab, index) => (
                                <Tab
                                    value={index}
                                    key={index}
                                    icon={tab.icon}
                                    label={
                                        <Grid container direction="column">
                                            <Typography variant="subtitle1" color="inherit">
                                                {tab.label}
                                            </Typography>
                                            <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                                                {tab.caption}
                                            </Typography>
                                        </Grid>
                                    }
                                    sx={{
                                        minHeight: 'auto',
                                        minWidth: { xs: '100%', md: 250 },
                                        padding: 2,
                                        borderRadius: `${theme.shape.borderRadius}px`,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        textAlign: 'left',
                                        justifyContent: 'flex-start',
                                        '&:after': {
                                            bgcolor: 'transparent !important'
                                        },
                                        '&.Mui-selected': {
                                            color: 'primary.main',
                                            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                                        },
                                        '& > svg': {
                                            marginBottom: '0px !important',
                                            mr: 1.25,
                                            mt: 0.25,
                                            height: 20,
                                            width: 20
                                        }
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Grid>
                    <Grid item xs={12}>
                        <TabPanel value={value} index={0}>
                            <ExpertProfilePage onNext={handleNextStep} params={params} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ExpertCalendarPage onBack={handlePrevStep} onNext={handleNextStep} params={params} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <BookInvoicePage onBack={handlePrevStep} />
                        </TabPanel>
                    </Grid>
                </Grid>
            </MainCard>
        </Box>
    );
};

export default ExpertBookingPage;
