import { gql } from '@apollo/client';

const UPDATE_USER = gql`
  mutation updateUser(
    $small: String
    $normal: String
    $name: String
    $surname: String
    $patronymic: String
    $dateOfBirth: String
    $hideDate: Boolean
    $hideYear: Boolean
    $facebook: String
    $vk: String
    $odnoklassniki: String
  ) {
    updateUser(
      small: $small
      normal: $normal
      name: $name
      surname: $surname
      patronymic: $patronymic
      dateOfBirth: $dateOfBirth
      hideDate: $hideDate
      hideYear: $hideYear
      facebook: $facebook
      vk: $vk
      odnoklassniki: $odnoklassniki
    ) {
      id
      email
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
        facebook
        vk
        odnoklassniki
      }
    }
  }
`;

export default UPDATE_USER;
