import { UserCreateForgotPassword } from 'package/api/user/create-forgot-password';
import CheckMail from 'views/authentication/auth1/check-mail';

export default async function Page({
  searchParams
}: {
  searchParams: {
    email: string;
  };
}) {
  const res = await UserCreateForgotPassword(searchParams);
  return <CheckMail email={searchParams.email} res={res} />;
}


