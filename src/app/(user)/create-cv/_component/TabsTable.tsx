"Use client"

import MainCard from "ui-component/cards/MainCard";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid } from "@mui/material";
import ChangeCVTemplate from "./ChangeCVTemplate";
import CVGuide from "./CVGuide";
import CVLibrary from "./CVLibrary";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const tabs = [
    "Đổi mẫu CV",
    "Thư viện CV theo ngành nghề",
    "Hướng dẫn viết CV"
];

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <>{children}</>}
        </div >
    );
}

const TabsTable = () => {

    const [value, setValue] = React.useState(0);

    const handleTabChange = (tabIndex: number) => {
        setValue(tabIndex);
    };

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {tabs.map((content, index) => (
                            <Button
                                key={index}
                                variant={value === index ? "contained" : "outlined"}
                                onClick={() => handleTabChange(index)}
                                sx={{ mt: 1, maxWidth: 100 }}
                            >
                                {content}
                            </Button>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <Box
                        sx={{ display: 'flex', flexGrow: 1, bgcolor: 'background.paper', boxShadow: 3 }}
                    >
                        <TabPanel value={value} index={0}>
                            <ChangeCVTemplate />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <CVLibrary />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <CVGuide />
                        </TabPanel>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default TabsTable;

// function a11yProps(index: number) {
//     return {
//         id: `vertical-tab-${index}`,
//         'aria-controls': `vertical-tabpanel-${index}`,
//     };
// }

{/* <Tabs
    aria-label="Vertical tabs example"
    orientation="vertical"
    variant="scrollable"
    value={value}
    onChange={handleChange}
    sx={{ borderRight: 1, borderColor: 'divider', justifyContent: "flex-start" }}
>
    <Tab label="Đổi mẫu CV" {...a11yProps(0)} />
    <Tab label="Thư viện CV theo ngành nghề" {...a11yProps(1)} />
    <Tab label="Hướng dẫn viết CV" {...a11yProps(2)} />
</Tabs> */}