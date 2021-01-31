import { gql } from '@apollo/client';

const FETCH_FRIENDS_QUERY = gql`
  query getFriends($usernameOwner: String!, $name: String!) {
    getFriends(usernameOwner: $usernameOwner, name: $name) {
      id
      username
    }
  }
`;

export default FETCH_FRIENDS_QUERY;
