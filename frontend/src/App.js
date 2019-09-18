import React from 'react';
import { AuthenticationProvider } from "@axa-fr/react-oidc-context";
import { Provider as ApolloContextPvodier } from './contexts/ApolloContext';

import oidcConfiguration from './oidc-configuration';

import TopPage from './pages/Top';

const App = () => (
  <AuthenticationProvider configuration={oidcConfiguration}>
    <ApolloContextPvodier>
      <TopPage />
    </ApolloContextPvodier>
  </AuthenticationProvider>
);

export default App;
