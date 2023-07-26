import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ApolloProvider } from '@apollo/client';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'News Agggregator',
  viewport: 'width=device-width,initial-scale=1',
});

import { ThemeProvider } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import awsconfig from '../aws-exports';

import amplifyUIStylesheet from '@aws-amplify/ui-react/styles.css';
import { studioTheme } from '../ui-components';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

import stylesheet from './tailwind.css';
import { apiClient } from './graphql/client';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'stylesheet', href: amplifyUIStylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={studioTheme}>
          <ApolloProvider client={apiClient}>
            <Authenticator socialProviders={['google']}>
              <Outlet />
            </Authenticator>
          </ApolloProvider>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
