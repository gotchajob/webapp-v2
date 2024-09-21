import { redirect } from 'next/navigation';
import { UserCreateVerify } from 'package/api/user/verify';
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
  console.log(res)
  if (res.status === 'error' && res.responseText === 'Verified account') {
    redirect("/login")
  }
  return <CodeVerification />;
}

