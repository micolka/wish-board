import { gql } from '@apollo/client';

const DELETE_WISH = gql`
  mutation deletePost($postId: ID!) {
    deleteWish(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($wishId: ID!, $commentId: ID!) {
    deleteComment(wishId: $wishId, commentId: $commentId) {
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

export { DELETE_WISH, DELETE_COMMENT };
