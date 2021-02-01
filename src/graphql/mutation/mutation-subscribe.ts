import { gql } from '@apollo/client';

const SUBSCRIBE_USER = gql`
  mutation subscribeUser($subscriptionUsername: String!) {
    subscribeUser(subscriptionUsername: $subscriptionUsername) {
      id
      username
      birthday
    }
  }
`;

export default SUBSCRIBE_USER;
