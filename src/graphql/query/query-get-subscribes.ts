import { gql } from '@apollo/client';

const FETCH_SUBSCRIBES_QUERY = gql`
  query getSubscribes($usernameOwner: String!, $name: String!) {
    getSubscribes(usernameOwner: $usernameOwner, name: $name) {
      id
      username
    }
  }
`;

export default FETCH_SUBSCRIBES_QUERY;
