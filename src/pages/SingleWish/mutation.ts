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

const LIKE_WISH = gql`
  mutation likeWish($wishId: ID!) {
    likeWish(wishId: $wishId) {
      id
      likes {
        username
        createdAt
      }
      likeCount
    }
  }
`;

export { ADD_COMMENT, LIKE_WISH };
