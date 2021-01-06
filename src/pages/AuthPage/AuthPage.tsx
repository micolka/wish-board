import { useMutation } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import React, { FunctionComponent, HTMLAttributes, useContext, useState } from 'react';
import type { RouteComponentProps } from 'react-router-dom';

import AuthContext from '@/context/AuthContex';
import useForm from '@/customHooks/form.hooks';
import styles from '@/pages/AuthPage/AuthPage.scss';
import LOGIN_USER from '@/pages/AuthPage/mutation';
import { IErrorsLogin, ILoginInput } from '@/types/AuthContext';
import { IValues } from '@/types/customHooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '45ch',
      },
    },
  })
);

type AuthPageProps = RouteComponentProps & HTMLAttributes<HTMLFormElement>;

const AuthPage: FunctionComponent<AuthPageProps> = ({ ...props }) => {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({} as IErrorsLogin);
  const loginUserCallback = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loginUser(); // eslint-disable-line @typescript-eslint/no-use-before-define
  };

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  } as IValues);

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData as ILoginInput);
      props.history.push('/');
    },
    onError(err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setErrors(err.graphQLErrors[0]!.extensions!.errors as IErrorsLogin);
    },
    variables: values,
  });

  return (
    <div className={styles['auth-page']}>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
        <div className={styles['auth-title']}>
          <Typography variant="h3" component="h3">
            Sign In
          </Typography>
        </div>
        <div>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            onChange={onChange}
            error={!!errors.username}
          />
        </div>
        <div>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={onChange}
            error={!!errors.password}
          />
        </div>
        <div className={styles['auth-button']}>
          <Button variant="contained" type="submit">
            Sign In
          </Button>
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className={styles['auth-errors']}>
          {Object.keys(errors).map(value => (
            <Alert variant="outlined" severity="error" key={value}>
              {errors[value]}
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthPage;
