import { gql } from '@apollo/client';

const ACTIVE_WISH = gql`
  mutation activeWish($wishId: ID!, $visibility: String) {
    activeWish(wishId: $wishId, visibility: $visibility) {
      id
      isActive
      isFulfilled
      activeCount
      fulfilledCount
      active {
        id
        createdAt
        visibility
        fulfilled
        comments {
          body
        }
        commentCount
        user {
          id
          username
          avatar {
            small
            normal
          }
        }
      }
    }
  }
`;

const FULFILLED_WISH = gql`
  mutation fulfilledWish($wishId: ID!, $visibility: String) {
    fulfilledWish(wishId: $wishId, visibility: $visibility) {
      id
      isActive
      isFulfilled
      activeCount
      fulfilledCount
    }
  }
`;

const DELETE_WISH = gql`
  mutation deleteWish($wishId: ID!) {
    deleteWish(wishId: $wishId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($wishId: ID!, $usernameOwner: String!, $commentId: ID!) {
    deleteComment(wishId: $wishId, usernameOwner: $usernameOwner, commentId: $commentId) {
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

export { ACTIVE_WISH, FULFILLED_WISH, DELETE_WISH, DELETE_COMMENT };
