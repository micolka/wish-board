import { gql } from '@apollo/client';

const DELETE_WISH = gql`
  mutation deleteWish($wishId: ID!) {
    deleteWish(wishId: $wishId)
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

export { DELETE_WISH, DELETE_COMMENT };
