import { gql } from '@apollo/client';

const FETCH_WISHES_QUERY = gql`
  {
    getWishes {
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

export default FETCH_WISHES_QUERY;
