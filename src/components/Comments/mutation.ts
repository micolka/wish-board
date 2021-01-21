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
const DELETE_COMMENT = gql`
  mutation deleteComment($wishId: ID!, $username: String!, $commentId: ID!) {
    deleteComment(wishId: $wishId, username: $username, commentId: $commentId) {
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

export { ADD_COMMENT, DELETE_COMMENT };
