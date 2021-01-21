import { gql } from '@apollo/client';

const LIKE_WISH = gql`
  mutation likeWish($wishId: ID!) {
    likeWish(wishId: $wishId) {
      id
      activeCount
      fulfilledCount
      likeCount
      likes {
        id
      }
    }
  }
`;

const ACTIVE_WISH = gql`
  mutation activeWish($wishId: ID!) {
    activeWish(wishId: $wishId) {
      id
      activeCount
      fulfilledCount
      likeCount
      likes {
        id
      }
    }
  }
`;

const FULFILLED_WISH = gql`
  mutation fulfilledWish($wishId: ID!) {
    fulfilledWish(wishId: $wishId) {
      id
      activeCount
      fulfilledCount
      likeCount
      likes {
        id
      }
    }
  }
`;

export { LIKE_WISH, ACTIVE_WISH, FULFILLED_WISH };
