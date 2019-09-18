import React  from 'react';
import { useReactOidc } from '@axa-fr/react-oidc-context';

import AppHeader from '../../organisms/AppHeader';
import CreateMessageForm from '../../organisms/CreateMessageForm';
import MessageTable from '../../organisms/MessageTable';

const TopPage = () => {
  const { oidcUser } = useReactOidc();

  return (
    <div>
      <AppHeader />
      {oidcUser && <CreateMessageForm />}
      <MessageTable />
    </div>
  );
};

export default TopPage;
