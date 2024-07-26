'use client';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { PRIMARYCOLOR } from 'components/common/config';
import { Text } from 'components/common/text/text';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { apiClientFetch } from 'package/api/api-fetch';
import { FlexBetween } from '../box/flex-box';
import { useRouter } from 'next/navigation';

export const NavigationItem = () => {
  const router = useRouter();

  const navItemList = [
    { name: 'Dịch vụ', targetId: 'dang-ky-phong-vn', icon: ArrowDropDownIcon },
    { name: 'Tạo CV', targetId: 'create-cv', icon: ArrowDropDownIcon },
    { name: 'Chia sẻ CV', targetId: 'cv', icon: ArrowDropDownIcon },
    { name: 'Blog', targetId: 'blog' }
  ];

  return (
    <>
      {navItemList.map((navItem, index) => (
        <Link href={`/${navItem.targetId}`} style={{ textDecoration: 'none' }} key={index}>
          <FlexBetween
            sx={{ cursor: 'pointer' }}
            width={navItem.icon ? '170px' : 'fit-content'}
            p={1.5}
            pl={3}
            pr={3}
          >
            <Text color={PRIMARYCOLOR} fontWeight={'bold'}>
              {navItem.name}
            </Text>
            {navItem.icon ? <ArrowDropDownIcon color="primary" /> : null}
          </FlexBetween>
        </Link>
      ))}
    </>
  );
};

export const LogoutButton = () => {
  const onClick = async () => {
    try {
      const res = await apiClientFetch('logout', {});
      if (res.status === 'error') {
        throw new Error('Không thể đăng xuất');
      }
      enqueueSnackbar(res.responseText, {
        variant: 'success',
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });
      window.location.href = '/';
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };
  return (
    <IconButton size="medium" onClick={onClick}>
      <LogoutIcon
        sx={{
          width: 26,
          height: 26
        }}
        color="primary"
      />
    </IconButton>
  );
};
