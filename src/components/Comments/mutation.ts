import { gql } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation createComment($wishId: ID!, $body: String!) {
    createComment(wishId: $wishId, body: $body) {
      id
      comments {
        id
        username
        createdAt
        body
        creator {
          username
          id
          avatar {
            small
          }
        }
      }
      commentCount
    }
  }
`;
const DELETE_COMMENT = gql`
  mutation deleteComment($wishId: ID!, $commentId: ID!) {
    deleteComment(wishId: $wishId, commentId: $commentId)
  }
`;

export { ADD_COMMENT, DELETE_COMMENT };
