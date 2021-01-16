import { gql } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation commentsWish($wishId: String!, $body: String!) {
    commentsWish(wishId: $wishId, body: $body) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default ADD_COMMENT;
