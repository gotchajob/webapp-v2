import Box from '@mui/material/Box';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <Box bgcolor={'#eef2f6'}>{children}</Box>;
}
