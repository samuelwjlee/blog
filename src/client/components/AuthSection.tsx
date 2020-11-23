import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss'

import AuthGoogleButton from 'client/components/AuthGoogleButton';
import AuthProfile from 'client/components/AuthProfile';
import { GoogleUser, User } from 'client/types/auth.types';
import { loadGoogleOAuthScript, signOutGoogleUser } from 'client/utils/auth.utils';
import { GOOGLE_OAUTH_BUTTON_ID } from 'client/constants/auth.constants';

const useStyles = createUseStyles({
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid black',
    padding: 30,
    width: 300,
    height: 135,
    [`& #${GOOGLE_OAUTH_BUTTON_ID}`]: {
      margin: 'auto'
    }
  },
  authActionContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10
  },
  signOutButton: {
    width: 100,
    height: 25,
    margin: 5
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

  const handleSignIn = (user: GoogleUser): void => {
    const profile = user.getBasicProfile();

    setUser({
      isSignedIn: user.isSignedIn(),
      name: profile.getName(),
      email: profile.getEmail(),
      profileImageUrl: profile.getImageUrl(),
    })
  };

  const handleSignOut = (): void => {
    signOutGoogleUser(() => setUser(InitialUserState))
  };

  useEffect(() => {
    loadGoogleOAuthScript(handleSignIn);
  }, []);

  return (
    user.isSignedIn
      ? <div className={classes.authContainer}>
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
      : <div className={classes.authContainer}>
          <AuthGoogleButton />
        </div>
  );
}

export default AuthSection;
