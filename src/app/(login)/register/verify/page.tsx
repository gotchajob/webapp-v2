import { redirect } from 'next/navigation';
import { UserCreateVerify } from 'package/api/user/create-verify-email';
import { useEffect } from 'react';
import CodeVerification from 'views/authentication/auth1/code-verification';

export default async function Page({
  searchParams
}: {
  searchParams: {
    email: string;
  };
}) {
  const res = await UserCreateVerify(searchParams);
  if (res.status === 'error' && res.responseText === 'Verified account') {
    redirect("/login")
  }
  return <CodeVerification />;
}

