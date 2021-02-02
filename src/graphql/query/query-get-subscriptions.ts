import { gql } from '@apollo/client';

const FETCH_SUBSCRIPTIONS_QUERY = gql`
  query getSubscriptions($usernameOwner: String!, $name: String!) {
    getSubscriptions(usernameOwner: $usernameOwner, name: $name) {
      id
      username
      isFriend
      birthday
      avatar {
        small
      }
    }
  }
`;

export default FETCH_SUBSCRIPTIONS_QUERY;
