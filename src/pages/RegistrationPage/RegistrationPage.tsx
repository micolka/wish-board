import { useMutation } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { FunctionComponent, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AuthContext from '@/context/AuthContext';
import useForm from '@/customHooks/form.hooks';
import styles from '@/pages/RegistrationPage/RegistrationPage.scss';
import REGISTER_USER from '@/pages/RegistrationPage/mutation';
import { IErrorsRegister, ILoginInput } from '@/types/AuthContext';

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

const RegistrationPage: FunctionComponent<RouteComponentProps> = props => {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({} as IErrorsRegister);

  function registerUser() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    addUser(); // eslint-disable-line @typescript-eslint/no-use-before-define
  }

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData as ILoginInput);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0]!.extensions!.errors as IErrorsRegister);
    },
    variables: values,
  });

  return (
    <div className={styles['registration-page']}>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
        <div className={styles['registration-title']}>
          <Typography variant="h3" component="h3">
            Registration
          </Typography>
        </div>
        <div>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            error={!!errors.username}
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            required
            id="email"
            name="email"
            label="email"
            variant="outlined"
            error={!!errors.email}
            onChange={onChange}
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
            error={!!errors.password}
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            required
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            onChange={onChange}
            error={!!errors.confirmPassword}
          />
        </div>
        <div className={styles['registration-button']}>
          <Button variant="contained" type="submit">
            sign up
          </Button>
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className={styles['registration-errors']}>
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

export default RegistrationPage;
