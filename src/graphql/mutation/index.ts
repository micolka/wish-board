import ADD_COMMENT from '@/graphql/mutation/mutation-add-comment';
import LIKE_WISH from '@/graphql/mutation/mutation-click-like';
import CREATE_WISH from '@/graphql/mutation/mutation-create-wish';
import {
  DELETE_ACTIVE_WISH,
  DELETE_FULFILLED_WISH,
  DELETE_WISH,
  DELETE_COMMENT,
} from '@/graphql/mutation/mutation-delete-wish';
import LOGIN_USER from '@/graphql/mutation/mutation-login';
import LOGOUT_USER from '@/graphql/mutation/mutation-logout';
import { ON_ACTIVE_WISH, ON_FULFILLED_WISH } from '@/graphql/mutation/mutation-onclick-wish';
import REGISTER_USER from '@/graphql/mutation/mutation-register-user';
import SUBSCRIBE_USER from '@/graphql/mutation/mutation-subscribe';

export {
  DELETE_ACTIVE_WISH,
  DELETE_FULFILLED_WISH,
  DELETE_WISH,
  DELETE_COMMENT,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  ON_ACTIVE_WISH,
  ON_FULFILLED_WISH,
  ADD_COMMENT,
  LIKE_WISH,
  SUBSCRIBE_USER,
  CREATE_WISH,
};
