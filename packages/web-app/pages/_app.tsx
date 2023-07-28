import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { ApolloProvider } from '@apollo/client';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';

import awsconfig from '../aws-exports';

import '@aws-amplify/ui-react/styles.css';
import { studioTheme } from '../ui-components';
import { Amplify } from 'aws-amplify';

Amplify.configure(awsconfig);

import { apiClient } from '../graphql/client';
import { MainLayout } from '../presentation/common/common.presentation';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NewsAggregator</title>
      </Head>
      <main className="app">
        <ThemeProvider theme={studioTheme}>
          <ApolloProvider client={apiClient}>
            <Authenticator socialProviders={['google']}>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </Authenticator>
          </ApolloProvider>
        </ThemeProvider>
      </main>
    </>
  );
}

export default CustomApp;
