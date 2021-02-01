import { gql } from '@apollo/client';

const FETCH_SUBSCRIBERS_QUERY = gql`
  query getSubscribers($usernameOwner: String!, $name: String!) {
    getSubscribers(usernameOwner: $usernameOwner, name: $name) {
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

export default FETCH_SUBSCRIBERS_QUERY;
