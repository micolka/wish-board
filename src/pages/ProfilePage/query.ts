import { gql } from '@apollo/client';

const FETCH_WISHES_QUERY = gql`
  query getWishByUser($usernameOwner: String!) {
    getWishByUserName(usernameOwner: $usernameOwner) {
      isLike
      isFulfilled
      isActive
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
      likes {
        id
        createdAt
        user {
          username
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
      activeCount
      fulfilledCount
    }
  }
`;

export default FETCH_WISHES_QUERY;
