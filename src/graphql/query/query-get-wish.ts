import { gql } from '@apollo/client';

const FETCH_WISH_QUERY = gql`
  query getWish($wishId: ID!, $usernameOwner: String!, $usernameGuest: String) {
    getWish(wishId: $wishId, usernameOwner: $usernameOwner, usernameGuest: $usernameGuest) {
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
          id
          createdAt
          body
          user {
            id
            username
            avatar {
              small
              normal
            }
          }
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
