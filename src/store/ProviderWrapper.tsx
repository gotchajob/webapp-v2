'use client';

import { ReactNode } from 'react';

// map styles
import 'mapbox-gl/dist/mapbox-gl.css';

// third-party
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// project-import
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';

import ThemeCustomization from 'themes';

import { persister, store } from 'store';
import { ConfigProvider } from 'contexts/ConfigContext';

import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import ThemeRegistry from 'components/theme-registry/theme-registry';
import SnackbarProvider from 'components/snackbar-provider';
import CssBaseline from '@mui/material/CssBaseline';
// import { useRouter } from 'next/router';
// import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from '../contexts/Auth0Context';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  // const router = useRouter();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConfigProvider>
          <ThemeCustomization>
            <RTLLayout>
              <Locales>
                <NavigationScroll>
                  <AuthProvider>
                    <Notistack>
                      <Snackbar />
                      {children}
                    </Notistack>
                  </AuthProvider>
                </NavigationScroll>
              </Locales>
            </RTLLayout>
          </ThemeCustomization>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}