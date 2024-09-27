"use client"

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { Box, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import { TabsProps } from 'types';
import { ThemeMode } from 'types/config';
import BookingReport from './_component/BookingReport';
import BookingReportDetail from './_component/BookingReportDetail';

function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const tabsOption = [
    {
        label: 'Danh Sách Báo Cáo',
        icon: <ReportGmailerrorredIcon sx={{ fontSize: '1.3rem' }} />,
        caption: 'Danh Sách Báo Cáo Buổi Phỏng Vấn của bạn'
    },
    {
        label: 'Thông tin Báo Cáo',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />,
        caption: 'Thông tin Báo Cáo buổi phỏng vấn của bạn  '
    }
];

export default function BookingReportPage() {
    const theme = useTheme();
    const [value, setValue] = useState<number>(0);
    const [selectedReportId, setSelectedReportId] = useState<number | null>(null);

    const handleNextStep = () => {
        setValue(1);
    };

    const handelPrevStep = () => {
        setValue(0);
    }

    const handleSelectEvent = (id: number) => {
        setSelectedReportId(id);
    };

    return (
        <Box
            sx={{
                height: '100%',
                // backgroundImage: 'linear-gradient(to bottom right, #DAECF6, #90C7E5, #59ABD9)',
                paddingX: 20,
                paddingY: 5
            }}
        >
            <MainCard sx={{ boxShadow: 3 }}>
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
                            <BookingReport onSelectEvent={handleSelectEvent} onNext={handleNextStep} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {selectedReportId && <BookingReportDetail reportId={selectedReportId} onPrev={handelPrevStep} />}
                        </TabPanel>
                    </Grid>
                </Grid>
            </MainCard>
        </Box>
    )
}
