"use client";

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
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReceiptIcon from '@mui/icons-material/Receipt';

// types
import { TabsProps } from 'types';
import { ThemeMode } from 'types/config';
import BookingCalendar from './_component/CustomerCalendar';
import BookingDetailPage from './_component/BookingDetail';

// tabPanel
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
    )
}

//tabs options
const tabsOption = [
    {
        label: "Lịch phỏng vấn",
        icon: <CalendarMonthIcon sx={{ fontSize: '1.3rem' }} />,
        caption: "Lịch sử lịch phỏng vấn của bạn"
    },
    {
        label: 'Thông tin lịch phỏng vấn',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
        caption: 'Thông tin lịch phỏng vấn của bạn  '
    }
]

const BookingCalendarPage = () => {
    const theme = useTheme();

    const [value, setValue] = useState<number>(0);

    const [selectEvent, setSelectEvent] = useState<any>();

    const handleNextStep = () => {
        setValue(1);
    }

    const handlePrevStep = () => {
        setValue(0);
    }

    const handleSelectEvent = (event: any) => {
        setSelectEvent(event);
    }

    return (
        <Box
            sx={{
                height: '100%',
                backgroundImage: 'linear-gradient(to bottom right, #DAECF6, #90C7E5, #59ABD9)',
                paddingX: 20,
                paddingY: 5
            }}>
            <MainCard>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Tabs
                            value={value}
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
                                        color: value >= index ? 'primary.main' : 'grey.900',
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
                            <BookingCalendar onNext={handleNextStep} onSelectEvent={handleSelectEvent} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <BookingDetailPage event={selectEvent} onBack={handlePrevStep} />
                        </TabPanel>
                    </Grid>
                </Grid>
            </MainCard>
        </Box>
    )
}

export default BookingCalendarPage;