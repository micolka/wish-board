import { gql } from '@apollo/client';

const SUBSCRIBE_USER = gql`
  mutation subscribeUser($subscriptionUsername: String!) {
    subscribeUser(subscriptionUsername: $subscriptionUsername) {
      id
      username
      connectionsLists {
        friends {
          id
          username
          birthday
          avatar {
            small
          }
        }
        subscriptions {
          id
          username
          birthday
          avatar {
            small
          }
        }
        subscribers {
          id
          username
          birthday
          avatar {
            small
          }
        }
      }
    }
  }
`;

export default SUBSCRIBE_USER;
