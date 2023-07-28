import awsconfig from '../aws-exports';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth, API } from 'aws-amplify';

const API_URL = awsconfig.aws_appsync_graphqlEndpoint;
const API_KEY = awsconfig.aws_appsync_apiKey;

const httpLink = createHttpLink({
  uri: API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  const session = await Auth.currentSession();
  // const session = await API.Credentials.get();
  const token = session.getIdToken().getJwtToken();
  return {
    headers: {
      ...headers,
      Authorization: token,
      // 'x-api-key': API_KEY,
    },
  };
});
export const apiClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
