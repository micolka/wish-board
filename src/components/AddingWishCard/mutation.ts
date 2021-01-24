import { gql } from '@apollo/client';

const ACTIVE_WISH = gql`
  mutation activeWish($wishId: ID!, $visibility: String) {
    activeWish(wishId: $wishId, visibility: $visibility) {
      id
      isActive
      isFulfilled
      activeCount
      fulfilledCount
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

export { ACTIVE_WISH, FULFILLED_WISH };
