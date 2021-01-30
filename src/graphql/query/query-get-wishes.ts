import { gql } from '@apollo/client';

const FETCH_WISHES_QUERY = gql`
  query getWishes($name: String, $usernameGuest: String) {
    getWishes(name: $name, usernameGuest: $usernameGuest) {
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

export default FETCH_WISHES_QUERY;
