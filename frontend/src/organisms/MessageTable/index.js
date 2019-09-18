import React, { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import styles from './index.module.css';

const MessageTable = () => {
  const LIST_MESAGGE = gql`
    query ListMessage {
      listMessage {
        items {
          id
          message {
            id
            value
            createdBy
            createdAt
          }
        }
      }
    }
  `;

  const DELETE_MESSAGE = gql`
    mutation DeleteMessage($input: DeleteMessageInput!) {
      deleteMessage(input: $input) {
        id
      }
    }
  `;

  const { data, loading, error } = useQuery(LIST_MESAGGE, {
    pollInterval: 10000,
  });

  const [deleteMessage] = useMutation(DELETE_MESSAGE, {
    onCompleted: result => {
      alert(JSON.stringify(result, null, 2));
    },
    onError: error => {
      alert(error.message)
    },
  });

  const onClickDeleteButton = useCallback(
    event => {
      const id = event.currentTarget.dataset.messageId;
      deleteMessage({
        variables: { input: { id } },
      });
    },
    [deleteMessage]
  );

  if (error) {
    return (
      <div>
        <h2>Messages</h2>
        <p>{error.message}</p>
      </div>
    )
  } else if (loading) {
    return (
      <div>
        <h2>Messages</h2>
        <p>Loading...</p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Messages</h2>
        <table className={styles['message-table']}>
          <thead>
            <tr className={styles['message-table__thead-tr']}>
              <th>Id</th>
              <th>Message</th>
              <th>CreatedBy</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.listMessage.items.map(({ id, message }) => {
              return message
                ? (
                  <tr className={styles['message-table__tbody-tr']} key={id}>
                    <td>{message.id}</td>
                    <td>{message.value}</td>
                    <td>{message.createdBy}</td>
                    <td>{message.createdAt}</td>
                    <td>
                      <button
                        onClick={onClickDeleteButton}
                        data-message-id={message.id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
                : (
                  <tr className={styles['message-table__tbody-tr']} key={id}>
                    <td colSpan="5">This message was deleted</td>
                  </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default MessageTable;
