import RegisterSuccess from 'views/authentication/auth1/success';

export default function Page({ searchParams }: { searchParams: { name: string } }) {
  return <RegisterSuccess name={searchParams.name} />;
}
