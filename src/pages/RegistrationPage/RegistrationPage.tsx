import { ApolloError, useMutation } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { FunctionComponent, useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AuthContext from '@/context/AuthContex';
import useForm from '@/customHooks/form.hooks';
import styles from '@/pages/RegistrationPage/RegistrationPage.scss';
import REGISTER_USER from '@/pages/RegistrationPage/mutation';
import { ILoginInput } from '@/types/AuthContext';

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
  const [errors, setErrors] = useState({} as ApolloError);

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
      setErrors(err);
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
            id="outlined-required"
            name="username"
            label="Username"
            variant="outlined"
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
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div className={styles['registration-button']}>
          <Button variant="contained" type="submit">
            sign up
          </Button>
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <div>{errors}</div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
