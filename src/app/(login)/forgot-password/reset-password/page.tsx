import ResetPassword from 'views/authentication/auth1/reset-password';

export default async function Page({
  searchParams
}: {
  searchParams: {
    email: string;
    code: string;
  };
}) {
  return <ResetPassword searchParams={searchParams} />;
}
