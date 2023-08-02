import { AppProps } from 'next/app';
import Head from 'next/head';
import { Amplify } from 'aws-amplify';
import { ApolloProvider } from '@apollo/client';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';

import './styles.css';
import '@aws-amplify/ui-react/styles.css';
import { studioTheme } from '../ui-components';

import awsConfig from './../aws-exports';

const hostname =
  typeof window !== 'undefined' ? window.location.hostname : undefined;
const isLocalhost = Boolean(
  hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    hostname?.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, appRedirectSignIn, productionRedirectSignIn] =
  awsConfig.oauth.redirectSignIn.split(',');

const [localRedirectSignOut, appRedirectSignOut, productionRedirectSignOut] =
  awsConfig.oauth.redirectSignOut.split(',');

const updatedAwsConfig = {
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};

Amplify.configure({ ...updatedAwsConfig, ssr: true });

import { apiClient } from '../graphql/client';

function CustomApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <>
      <Head>
        <title>NewsAggregator</title>
      </Head>
      <main className="app">
        <ThemeProvider theme={studioTheme}>
          <ApolloProvider client={apiClient}>
            <Authenticator.Provider>
              {getLayout(<Component {...pageProps} />)}
            </Authenticator.Provider>
          </ApolloProvider>
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;
