import { ApolloError, gql, useMutation } from '@apollo/client';
import React, { FunctionComponent, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AuthContext from '@/context/AuthContex';
import useForm from '@/customHooks/form.hooks';
import styles from '@/pages/AuthPage/AuthPage.scss';
import { ILoginInput } from '@/types/AuthContext';

const AuthPage: FunctionComponent<RouteComponentProps> = props => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({} as ApolloError);

  const loginUserCallback = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loginUser(); // eslint-disable-line @typescript-eslint/no-use-before-define
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        email
        username
        createdAt
        token
      }
    }
  `;
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData as ILoginInput);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err);
    },
    variables: values,
  });

  return (
    <div className={styles['auth-page']}>
      <form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <input
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <input
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <button type="submit">Login</button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <div>{errors}</div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
