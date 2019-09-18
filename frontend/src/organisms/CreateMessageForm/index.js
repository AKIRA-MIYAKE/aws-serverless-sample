import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const CreateMessageForm = () => {
  const CREATE_MESSAGE = gql`
    mutation CreateMessage($input: CreateMessageInput!) {
      createMessage(input: $input) {
        id
        value
        createdBy
        createdAt
      }
    }
  `;

  const [value, updateValue] = useState('');

  const [createMessage] = useMutation(CREATE_MESSAGE, {
    onCompleted: result => {
      alert(JSON.stringify(result, null, 2));
    },
    onError: error => {
      alert(error.message)
    },
  });

  const onChangeInputText = useCallback(
    event => {
      updateValue(event.currentTarget.value);
    },
    [updateValue]
  );

  const onClickCreateButton = useCallback(() => {
    if (value.length > 0) {
      createMessage({
        variables: { input: { value } },
      });
      updateValue('');
    }
  }, [value, createMessage, updateValue]);

  return (
    <div>
      <h3>Create Message</h3>
      <input type="text" value={value} onChange={onChangeInputText} />
      <button onClick={onClickCreateButton}>Create</button>
    </div>
  );
};

export default CreateMessageForm;
