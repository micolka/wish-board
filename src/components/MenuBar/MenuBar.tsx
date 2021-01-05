import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from '@/components/MenuBar/MenuBar.scss';
import { friendsConst, loginConst, nameApp, registrationConst, wishConst } from '@/constants';
import AuthContext from '@/context/AuthContex';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

interface PropsMenu extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const MenuBar: FunctionComponent<PropsMenu> = ({ children }) => {
  const classes = useStyles();
  const { token, id, logout } = useContext(AuthContext);
  const profileHref = id ? `/@${id}` : null;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfile = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuBar = token ? (
    <div>
      <Button color="inherit">
        <Link className={styles['link']} to="/">
          {wishConst}
        </Link>
      </Button>
      <Button color="inherit">
        <Link className={styles['link']} to={`/${friendsConst}`}>
          {friendsConst}
        </Link>
      </Button>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {profileHref && (
          <MenuItem onClick={handleProfile}>
            <Link className={styles['link']} to={profileHref}>
              Profile
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  ) : (
    <Fragment>
      <Button color="inherit">
        <Link className={styles['link']} to={`/${loginConst}`}>
          {loginConst}
        </Link>
      </Button>
      <Button color="inherit">
        <Link className={styles['link']} to={`/${registrationConst}`}>
          {registrationConst}
        </Link>
      </Button>
    </Fragment>
  );

  return (
    <div className={styles['menu']}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={styles['link']} to="/">
              {nameApp}
            </Link>
          </Typography>
          {menuBar}
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default MenuBar;
