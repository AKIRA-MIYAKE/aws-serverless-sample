import React, { createContext, useMemo } from 'react';
import { useReactOidc } from '@axa-fr/react-oidc-context';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const ApolloContext = createContext();

export default ApolloContext;

export const Provider = ({ children }) => {
  const { oidcUser } = useReactOidc();

  const client = useMemo(
    () => {
      if (oidcUser && oidcUser.id_token) {
        return new ApolloClient({
          uri: process.env.REACT_APP_GRAPHQL_URL,
          request: operation => {
            operation.setContext({
              headers: {
                Authorization: `${oidcUser.id_token}`,
              },
            });
          },
        });
      } else {
        return new ApolloClient({
          uri: process.env.REACT_APP_GRAPHQL_URL,
          request: operation => {
            operation.setContext({
              headers: {
                'x-api-key': process.env.REACT_APP_GRAPHQL_API_KEY,
              },
            });
          },
        });
      }
    },
    [oidcUser]
  );

  return (
    <ApolloContext.Provider value={{ client }}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ApolloContext.Provider>
  );
};
