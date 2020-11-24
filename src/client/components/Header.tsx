import React from 'react';
import { createUseStyles } from 'react-jss'

import Auth from 'client/components/Auth';
import { HEADER_HEIGHT } from 'client/constants/auth.constants';

const useStyles = createUseStyles({
  header: {
    top: 0,
    left: 0,
    width: '100vw',
    height: HEADER_HEIGHT,
    background: 'lightgray',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Auth />
    </div>
  )
}

export default Header;
