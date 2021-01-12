import { gql } from '@apollo/client';

const LIKE_POST_MUTATION = gql`
  mutation likeWish($wishId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LIKE_POST_MUTATION;
