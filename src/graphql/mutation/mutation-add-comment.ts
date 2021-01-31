import { gql } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation createComment($wishId: ID!, $usernameOwner: String!, $body: String!) {
    createComment(wishId: $wishId, usernameOwner: $usernameOwner, body: $body) {
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
