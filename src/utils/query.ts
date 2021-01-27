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

export { FETCH_WISH_QUERY, FETCH_WISHES_QUERY };
