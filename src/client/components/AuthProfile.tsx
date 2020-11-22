import React from 'react';
import { createUseStyles } from 'react-jss'

import { User } from 'client/types/Auth';

const useStyles = createUseStyles({
  profileContainer: {
    display: 'flex'
  },
  profileImage: {
    borderRadius: '50%',
    marginRight: 10
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10
  },
  profileInfoItem: {
    fontSize: 14
  }
});

const AuthProfile: React.FC<User> = ({
  profileImageUrl,
  name,
  email
}) => {
  const classes = useStyles();

  return (
    <div className={classes.profileContainer}>
      <img
        alt='profile'
        className={classes.profileImage}
        src={profileImageUrl || ''} />
      <div className={classes.profileInfo}>
        <div className={classes.profileInfoItem}>{ name }</div>
        <div className={classes.profileInfoItem}>{ email }</div>
      </div>
    </div>
  )
};

export default AuthProfile;