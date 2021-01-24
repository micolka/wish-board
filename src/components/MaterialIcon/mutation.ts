import { gql } from '@apollo/client';

const LIKE_WISH = gql`
  mutation likeWish($wishId: ID!) {
    likeWish(wishId: $wishId) {
      id
      isLike
      likeCount
      likes {
        id
      }
    }
  }
`;

export default LIKE_WISH;
