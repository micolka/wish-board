import { gql } from '@apollo/client';

const FETCH_WISHES_QUERY = gql`
  query getInfoUserByName($usernameOwner: String!) {
    getInfoUserByName(usernameOwner: $usernameOwner) {
      wishes {
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
        isLike
        isFulfilled
        isActive
      }

      user {
        id
        email
        username
        avatar {
          small
          normal
        }
        personalData {
          name
          surname
          patronymic
          dateOfBirth
          hideDate
          hideYear
        }
        socialNetworks {
          facebok
          vk
          odnoklassniki
        }
        connectionsLists {
          friends
        }
      }
    }
  }
`;

export default FETCH_WISHES_QUERY;
