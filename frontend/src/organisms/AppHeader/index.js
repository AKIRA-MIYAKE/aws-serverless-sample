import React from 'react';
import { useReactOidc } from '@axa-fr/react-oidc-context';

const AppHeader = () => {
  const { login, logout, oidcUser } = useReactOidc();

  return (
    <header>
      <h1>AWS SLS Sample</h1>
      {
        oidcUser
          ? <div><button onClick={logout}>Logout</button></div>
          : <div><button onClick={login}>Login</button></div>
      }
      {oidcUser && (
        <span>sub(generated by cognito): {oidcUser.profile.sub}</span>
      )}
    </header>
  );
};

export default AppHeader;
