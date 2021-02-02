import { gql } from '@apollo/client';

const CREATE_WISH = gql`
  mutation createWish(
    $name: String!
    $price: String!
    $currency: String!
    $backgroundColor: String!
    $image: String!
    $originURL: String
    $visibility: String
    $description: String
  ) {
    createWish(
      name: $name
      price: $price
      currency: $currency
      originURL: $originURL
      visibility: $visibility
      description: $description
      backgroundColor: $backgroundColor
      image: $image
    ) {
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
      likes {
        createdAt
      }
      likeCount
    }
  }
`;

export default CREATE_WISH;
