import React, { useState } from 'react';
import { createUseStyles } from 'react-jss'

import GoogleAuthButton from 'client/components/GoogleAuthButton';
import AuthProfile from 'client/components/AuthProfile';
import { User } from 'client/types/Auth';

const useStyles = createUseStyles({
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    border: '1px solid black'
  },
  authActionContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  signOutButton: {
    width: 100,
    height: 25,
    margin: 5
  },
  signInContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 50,
    border: '1px solid black'
  },
  signInTitle: {
    fontSize: 15,
    fontWeight: 600,
    margin: '10px 0px'
  }
});

const InitialUserState = {
  isSignedIn: false,
  name: null,
  email: null,
  profileImageUrl: null
};

const AuthSection: React.FC = () => {
  const classes = useStyles();
  /* TODO: move user object to redux store to be globally referenced */
  const [ user, setUser ] = useState<User>(InitialUserState);

  const handleSignIn = (user: any): void => {
    const profile = user.getBasicProfile();

    setUser({
      isSignedIn: user.isSignedIn(),
      name: profile.getName(),
      email: profile.getEmail(),
      profileImageUrl: profile.getImageUrl(),
    })
  }
  const handleSignOut = () => {
    const googleApi = (window as any).gapi;

    if (googleApi) {
      googleApi.auth2.getAuthInstance().signOut()
        .then(() => setUser(InitialUserState))
        .catch(console.log)
    }
  };

  return (
    user.isSignedIn
      ? <div className={classes.profileContainer}>
          <AuthProfile
            isSignedIn={user.isSignedIn}
            name={user.name}
            email={user.email}
            profileImageUrl={user.profileImageUrl} />
            <div className={classes.authActionContainer}>
              <button
                className={classes.signOutButton}
                onClick={handleSignOut}>
                  Sign out
              </button>
            </div>
        </div>
      : <div className={classes.signInContainer}>
          <div className={classes.signInTitle}>
            Sign into Wordful with Google
          </div>
          <GoogleAuthButton handleSignIn={handleSignIn} />
        </div>
  );
}

export default AuthSection;
