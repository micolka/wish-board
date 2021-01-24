import { gql } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation createComment($wishId: ID!, $username: String!, $body: String!) {
    createComment(wishId: $wishId, username: $username, body: $body) {
      id
      active {
        comments {
          createdAt
          id
          body
          user {
            username
          }
        }
      }
    }
  }
`;

export default ADD_COMMENT;
