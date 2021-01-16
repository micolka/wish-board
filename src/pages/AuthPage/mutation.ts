import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

export default LOGIN_USER;
