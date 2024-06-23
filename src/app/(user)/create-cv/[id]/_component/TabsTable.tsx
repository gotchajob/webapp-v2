'Use client';

import MainCard from 'ui-component/cards/MainCard';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { FlexCenter } from 'components/common/box/flex-box';
import { Text } from 'components/common/text/text';
import SubCard from 'ui-component/cards/SubCard';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { ComponentTemplateList, PersonalInformationTemplate } from 'components/cv-component/interface';
import Iconify from 'components/iconify/iconify';
import { PRIMARYCOLOR } from 'components/common/config';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const defaultShadow = '0 2px 14px 0 rgb(33 150 243 / 10%)';

const tabs = [
  { icon: <InfoIcon />, title: 'Hướng dẫn' },
  {
    icon: <EditIcon />,
    title: 'Chỉnh sửa'
  }
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

const TabsTable = () => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (tabIndex: number) => {
    setValue(tabIndex);
  };

  const [openComponent, setOpenComponent] = React.useState(true);

  const handleOpenComponent = () => {
    setOpenComponent(!openComponent);
  };

  const [openInformation, setOpenInformation] = React.useState(true);

  const handleOpenInformation = () => {
    setOpenInformation(!openInformation);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TabPanel value={value} index={0}>
            <SubCard title={'Hướng dẫn viết CV'} sx={{ width: '100%', boxShadow: defaultShadow }}>
              dw
            </SubCard>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SubCard title={'Chỉnh sửa CV'} sx={{ width: '100%', boxShadow: defaultShadow }} contentSX={{ p: 0 }}>
              <List>
                <ListItemButton onClick={handleOpenComponent}>
                  <ListItemText primary="Thông tin cá nhân" />
                  {openComponent ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openComponent} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {PersonalInformationTemplate.map((information) => (
                      <ListItemButton>
                        <ListItemIcon>
                          <Iconify color={PRIMARYCOLOR} icon={information.icon} />
                        </ListItemIcon>
                        <ListItemText primary={'Thêm ' + information.fieldName} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
                <ListItemButton onClick={handleOpenInformation}>
                  <ListItemText primary="Danh mục" />
                  {openInformation ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openInformation} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {ComponentTemplateList.map((component) => (
                      <ListItemButton>
                        <ListItemIcon>
                          <Iconify color={PRIMARYCOLOR} icon={component.icon} />
                        </ListItemIcon>
                        <ListItemText primary={'Thêm ' + component.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </List>
            </SubCard>
          </TabPanel>
        </Grid>
        <Grid item xs={2.5}>
          <Stack spacing={2}>
            {tabs.map((content, index) => (
              <Button
                sx={{ textTransform: 'none' }}
                key={index}
                variant={value === index ? 'contained' : 'outlined'}
                onClick={() => handleTabChange(index)}
              >
                <FlexCenter>
                  {content.icon}
                  <Text fontSize={10} mt={1}>
                    {content.title}
                  </Text>
                </FlexCenter>
              </Button>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default TabsTable;
