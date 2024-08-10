import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserToken } from 'package/cookies/token';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const userToken = getUserToken(cookies());
  if (userToken === '') {
    redirect('/login');
  }
  return <>{children}</>;
}
