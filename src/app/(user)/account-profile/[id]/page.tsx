'use client';

import React, { useEffect, useState } from 'react';

// material-ui
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// project imports
import useConfig from 'hooks/useConfig';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

// assets
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';

// types
import { Box } from '@mui/material';
import { useGetSearchParams } from 'hooks/use-get-params';
import { useGetUser } from 'hooks/use-get-user';
import { useRefresh } from 'hooks/use-refresh';
import { TabsProps } from 'types';
import { ThemeMode } from 'types/config';
import Billing from '../_component/Billing';
import ChangePassword from '../_component/ChangePassword';
import OrderComplete from '../_component/OrderComplete';
import Payment from '../_component/Payment';
import UserProfile from '../_component/UserProfile';
import { PatchDeposit } from 'package/api/account/current/deposit';
import { CustomerToken } from 'hooks/use-login';
import { GetVNPayCallback } from 'package/api/account/vn-pay-callback';
import { useSearchParams } from 'next/navigation';

// tabs
function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// tabs option
const tabsOption = [
  {
    label: 'Thông tin cá nhân',
    icon: <PersonOutlineTwoToneIcon />,
    caption: 'Profile Settings'
  },
  {
    label: 'Lịch sử giao dịch',
    icon: <DescriptionTwoToneIcon />,
    caption: 'Trensactions'
  },
  {
    label: 'Phương thức thanh toán',
    icon: <CreditCardTwoToneIcon />,
    caption: 'Payment'
  },
  {
    label: 'Mật khẩu và bảo mặt',
    icon: <VpnKeyTwoToneIcon />,
    caption: 'Profile Security'
  }
];

// ==============================|| PROFILE 2 ||============================== //

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { mode, borderRadius } = useConfig();

  const { customerToken } = CustomerToken();

  //get params
  const { vnp_TransactionStatus } = useGetSearchParams(['vnp_TransactionStatus']);

  const { vnp_Amount } = useGetSearchParams(['vnp_Amount']);

  const [open, setOpen] = useState<number>(-1);

  const [value, setValue] = React.useState<number>(0);

  const { refreshTime, refresh } = useRefresh();

  const { user, loading } = useGetUser({ pageNumber: 1, pageSize: 1000, search: [`id:${params.id}`] }, refreshTime); //doi thanh GetCurrent

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTransactionClick = () => {
    setValue(1);
    setOpen(-1);
  };

  const handleContinueClick = () => {
    setValue(2);
    setOpen(-1);
  };

  const searchParams = useSearchParams();
  const patchDeposit = async () => {
    try {
      setOpen(0);
      const res = await GetVNPayCallback({ searchParams: searchParams.toString() });
      console.log(res)
      if (res.status !== 'success') {
        throw new Error();
      }
      setOpen(1);
    } catch (error) {
      console.log(error);
      setOpen(2);
    }
  };

  useEffect(() => {
    setValue(2);
    console.log('test', vnp_TransactionStatus);
    if (vnp_TransactionStatus && customerToken) {
      patchDeposit();
    }
  }, [vnp_TransactionStatus, customerToken]);

  return (
    <Box
      sx={{
        height: '100%',
        backgroundImage: 'linear-gradient(to bottom right, #DAECF6, #90C7E5, #59ABD9)',
        display: 'flex',
        padding: 5
      }}
    >
      <MainCard
        title="Thiết lập tài khoản"
        content={false}
        boxShadow
        hover
        sx={{
          minWidth: '100%',
          maxHeight: '100%'
        }}
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={3}>
            <CardContent>
              <Tabs
                value={value}
                onChange={handleChange}
                orientation="vertical"
                variant="scrollable"
                sx={{
                  '& .MuiTabs-flexContainer': {
                    borderBottom: 'none'
                  },
                  '& button': {
                    color: mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                    minHeight: 'auto',
                    minWidth: '100%',
                    py: 1.5,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    borderRadius: `${borderRadius}px`
                  },
                  '& button.Mui-selected': {
                    color: 'primary.main',
                    bgcolor: mode === ThemeMode.DARK ? 'dark.main' : 'grey.50'
                  },
                  '& button > svg': {
                    marginBottom: '0px !important',
                    marginRight: 1.25,
                    marginTop: 1.25,
                    height: 20,
                    width: 20
                  },
                  '& button > div > span': {
                    display: 'block'
                  },
                  '& > div > span': {
                    display: 'none'
                  }
                }}
              >
                {tabsOption.map((tab, index) => (
                  <Tab
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
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>
            </CardContent>
          </Grid>
          <Grid item xs={12} lg={9}>
            <CardContent>
              <TabPanel value={value} index={0}>
                <UserProfile user={user[0]} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Billing />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Payment />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <ChangePassword />
              </TabPanel>
            </CardContent>
          </Grid>
        </Grid>
        <Divider />
      </MainCard>

      <OrderComplete
        open={open}
        onClose={() => setOpen(-1)}
        transactionClick={handleTransactionClick}
        continueClick={handleContinueClick}
      />
    </Box>
  );
};

export default ProfilePage;
