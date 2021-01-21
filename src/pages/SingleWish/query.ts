import { gql } from '@apollo/client';

const FETCH_WISH_QUERY = gql`
  query getWish($wishId: ID!, $username: String!) {
    getWish(wishId: $wishId, username: $username) {
      id
      name
      originURL
      description
      backgroundColor
      image {
        small
        normal
      }
      price {
        value
        currency
      }
      activeCount
      fulfilledCount
      likes {
        id
        createdAt
        user {
          id
          username
          avatar {
            small
            normal
          }
        }
      }
      likeCount
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

export default FETCH_WISH_QUERY;
