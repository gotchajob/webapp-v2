import LoginIcon from '@mui/icons-material/Login';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { FlexBetween, FlexBox } from 'components/common/box/flex-box';
import { ContainedButton, OutlinedButton } from 'components/common/button/button';
import { ImageCard } from 'components/common/image/image-card';
import { CartIcon, UserIcon } from 'components/icon/mock-interview-icon';
import Link from 'next/link';
import { MenuDrawler } from './menu-drawler';
import { LogoutButton, NavigationItem } from './nav-item';
import Box from '@mui/material/Box';

export const Header = ({ alreadyLogin }: { alreadyLogin: boolean }) => {
  return (
    <Box
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
            {/* <IconButton size="small">
              <CartIcon width={36} />
            </IconButton> */}
            <IconButton size="small">
              <UserIcon width={36} />
            </IconButton>
            <LogoutButton />
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
    </Box>
  );
};
