import { gql } from '@apollo/client';

const FETCH_WISH_QUERY = gql`
  query getWish($wishId: ID!) {
    getWish(wishId: $wishId) {
      id
      name
      createdAt
      creator {
        id
        username
        avatar {
          small
        }
      }
      backgroundColor
      originURL
      description
      image {
        small
        normal
      }
      price {
        value
        currency
      }
      active {
        username
      }
      activeCount
      comments {
        username
        createdAt
        body
        avatar {
          small
        }
      }
      commentCount
      likes {
        username
        createdAt
      }
      likeCount
      fulfilled {
        username
      }
      fulfilledCount
    }
  }
`;

export default FETCH_WISH_QUERY;
