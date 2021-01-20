import { gql } from '@apollo/client';

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

const ACTIVE_WISH = gql`
  mutation activeWish($wishId: ID!) {
    activeWish(wishId: $wishId) {
      id
      active {
        username
        createdAt
      }
      activeCount
    }
  }
`;

const FULFILLED_WISH = gql`
  mutation fulfilledWish($wishId: ID!) {
    fulfilledWish(wishId: $wishId) {
      id
      fulfilled {
        username
        createdAt
      }
      fulfilledCount
    }
  }
`;

export { LIKE_WISH, ACTIVE_WISH, FULFILLED_WISH };
