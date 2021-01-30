import { gql } from '@apollo/client';

const ON_ACTIVE_WISH = gql`
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

const ON_FULFILLED_WISH = gql`
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

export { ON_ACTIVE_WISH, ON_FULFILLED_WISH };
