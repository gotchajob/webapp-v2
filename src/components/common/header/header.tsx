"use client"

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { useTheme } from '@mui/material/styles';
import { IconSettings } from '@tabler/icons-react';
import { FlexBetween, FlexBox } from 'components/common/box/flex-box';
import { ContainedButton, OutlinedButton } from 'components/common/button/button';
import { ImageCard } from 'components/common/image/image-card';
import { UserIcon } from 'components/icon/mock-interview-icon';
import { useGetCustomer } from 'hooks/use-get-current-user';
import { CustomerToken } from 'hooks/use-login';
import useConfig from 'hooks/useConfig';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
import Transitions from 'ui-component/extended/Transitions';
import { LogoutButton, NavigationItem } from './nav-item';
import WalletCard from './_components/WalletCard';
import { ThemeMode } from 'types/config';
import { useSearchParamsNavigation } from 'hooks/use-get-params';
import { StyledLink } from 'components/common/link/styled-link';
import { apiClientFetch } from 'package/api/api-fetch';
import { enqueueSnackbar } from 'notistack';
import ContactsIcon from '@mui/icons-material/Contacts';
import EventNoteIcon from '@mui/icons-material/EventNote';
import useSnackbarDialog from '../snackbar-dialog/snackbar-dialog';


export const Header = ({ alreadyLogin }: { alreadyLogin: boolean }) => {
  const theme = useTheme();

  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();

  //get customer token
  const { customerToken } = CustomerToken();

  //get profile customer
  const { customer } = useGetCustomer(customerToken);

  //route hook
  const { push } = useSearchParamsNavigation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { borderRadius } = useConfig();

  const [sdm, setSdm] = useState(true);

  const [value, setValue] = useState('');

  const [notification, setNotification] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const anchorRef = useRef<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const prevOpen = useRef(open);

  //Handle open popper
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  //Handle close popper
  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setAnchorEl(null);
  };

  // const forwadToAccountProfile = () => {
  //   push([{ name: "" }, false]);
  // }

  //Sign Out
  const handleLogout = async () => {
    try {
      const res = await apiClientFetch('logout', {});
      if (res.status === 'error') {
        throw new Error('Không thể đăng xuất');
      }
      enqueueSnackbar('Đăng xuất thành công', { variant: 'success' });
      window.location.href = "/login"
    } catch (err) {
      enqueueSnackbar('Đăng xuất thất bại', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    < Box
      sx={{
        width: '100%',
        height: '96px',
        position: 'fixed',
        zIndex: 10000,
        top: 0,
        background: 'rgba(251, 253, 255, 0.80)',
        padding: '25px 0px 23px !important',
        boxShadow: ' 0px 4px 30px 0px rgba(8, 78, 118, 0.20);'
      }}
    >
      <FlexBetween maxWidth={1450} margin={'auto'} px={2}>
        <Link href={'/'} style={{ paddingTop: 7 }}>
          <ImageCard src="/assets/images/logo.png" width={180} />
        </Link>
        <FlexBox>
          <NavigationItem />
        </FlexBox>
        {alreadyLogin ? (
          <FlexBox>
            <IconButton size="small" onClick={handleClick}>
              {customer ? (<Avatar
                sx={{ width: 36, height: 36 }}
                size="sm"
                alt="User"
                src={customer.avatar}
              />) : (<UserIcon width={36} />)}
            </IconButton>
          </FlexBox>
        ) : (
          <>
            <FlexBox
              sx={{
                display: {
                  xl: 'flex !important',
                  sm: 'flex !important',
                  xs: 'none'
                }
              }}
            >
              <OutlinedButton component={Link} href="/register" sx={{ mr: 2 }}>
                Đăng kí
              </OutlinedButton>
              <ContainedButton component={Link} href="/login">
                Đăng nhập
              </ContainedButton>
            </FlexBox>
            <IconButton
              size="large"
              sx={{
                display: {
                  xl: 'none !important',
                  sm: 'none !important',
                  xs: 'flex'
                }
              }}
            >
              <LoginIcon color="primary" />
            </IconButton>
          </>
        )}
      </FlexBetween>

      {/* Menu account */}
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 14]
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              {open && (
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]} sx={{ backgroundColor: "#F8FAFC" }}>
                  <Box sx={{ p: 2, pb: 0 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Kính chào,</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {customer ? customer.fullName : "Quí khách"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <WalletCard />  {/* Wallet Card */}
                    {/* <Card sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.800' : 'primary.light', my: 2 }}>
                      <CardContent>
                        <Grid container spacing={3} direction="column">
                          <Grid item>
                            <Grid item container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1">Start DND Mode</Typography>
                              </Grid>
                              <Grid item>
                                <Switch
                                  color="primary"
                                  checked={sdm}
                                  onChange={(e) => setSdm(e.target.checked)}
                                  name="sdm"
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid item container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1">Allow Notifications</Typography>
                              </Grid>
                              <Grid item>
                                  <Switch
                                    checked={notification}
                                    onChange={(e) => setNotification(e.target.checked)}
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card> */}
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        bgcolor: theme.palette.background.paper,
                        borderRadius: `${borderRadius}px`,
                        '& .MuiListItemButton-root': { mt: 0.5 },
                      }}
                    >
                      <StyledLink href={`/quan-ly-cv`} >
                        <StyledLink href={`/booking-calendar/${customer?.id}`}>
                          <ListItemButton
                            sx={{
                              borderRadius: `${borderRadius}px`,
                            }}
                            selected={selectedIndex === 0}
                            onClick={() => { }}
                          >
                            <ListItemIcon>
                              <EventNoteIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2">
                                  <FormattedMessage id="Lịch sử phỏng vấn" />
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </StyledLink>
                        <ListItemButton>
                          <ListItemIcon>
                            <ContactsIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                <FormattedMessage id="Quản lý CV" />
                              </Typography>
                            }>
                          </ListItemText>
                        </ListItemButton>
                      </StyledLink>
                      <StyledLink href={`/account-profile/${customer?.id}`}>
                        <ListItemButton
                          sx={{
                            borderRadius: `${borderRadius}px`,
                          }}
                          selected={selectedIndex === 0}
                          onClick={() => { }}
                        >
                          <ListItemIcon>
                            <IconSettings />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                <FormattedMessage id="Cài đặt tài khoản" />
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </StyledLink>
                      <ListItemButton
                        sx={{
                          borderRadius: `${borderRadius}px`,
                        }}
                        selected={selectedIndex === 0}
                        onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2">
                              <FormattedMessage id="Đăng xuất" />
                            </Typography>
                          }>
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              )}
            </Paper>
          </Transitions>
        )}
      </Popper>

    </Box >
  );
};
