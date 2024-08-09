import './globals.css';

// PROJECT IMPORTS
import { UpdateAccessServer } from 'components/common/access/update-access';
import SnackbarProvider from 'components/snackbar-provider';
import ThemeRegistry from 'components/theme-registry/theme-registry';
import { cookies } from 'next/headers';
import { getAccessTime } from 'package/cookies/token';
import ProviderWrapper from 'store/ProviderWrapper';

export const metadata = {
  title: 'Gotcha Job',
  description: 'Nền tảng website & app cung cấp các dịch vụ cải thiện kỹ năng người dùng trong quá trình họ tham gia ứng tuyển công việc'
};

// ==============================|| ROOT LAYOUT ||============================== //

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  // const accessTime = await getAccessTime(cookies());

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/assets/images/favicon.ico" />
      </head>
      <body
        style={{
          overflowX: 'hidden'
        }}
      >
        {/* <UpdateAccessServer accessTime={accessTime} /> */}
        <ProviderWrapper>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}
