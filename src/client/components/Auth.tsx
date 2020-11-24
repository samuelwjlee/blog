import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss'

import AuthGoogleButton from 'client/components/AuthGoogleButton';
import AuthProfile from 'client/components/AuthProfile';
import { GoogleUser, User } from 'client/types/auth.types';
import { loadGoogleOAuthScript, renderGoogleOAuthButton, signInGoogleUser, signOutGoogleUser } from 'client/utils/auth.utils';
import { GOOGLE_OAUTH_BUTTON_ID } from 'client/constants/auth.constants';
import { HEADER_HEIGHT } from 'client/constants/auth.constants';

const useStyles = createUseStyles({
  authButton: {
    borderRadius: '50%',
    height: 45
  },
  authContainer: {
    position: 'absolute',
    top: HEADER_HEIGHT + 10,
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

const Auth: React.FC = () => {
  const classes = useStyles();
  /* TODO: move user object to redux store to be globally referenced */
  const [ user, setUser ] = useState<User>(InitialUserState);
  const [ isAuthOpen, setIsAuthOpen ] = useState<boolean>(false);

  const handleSignIn = (googleUser: GoogleUser): void => {
    signInGoogleUser({ user: googleUser, callback: setUser });
  };

  const handleSignOut = (): void => {
    signOutGoogleUser({ user: InitialUserState, callback: setUser });
  };

  useEffect(() => {
    loadGoogleOAuthScript(handleSignIn);
  }, []);

  /**
   * need to do a fresh google oAuth re-render
   * when isAuthOpen and !user.isSigned
   */
  useEffect(() => {
    if (isAuthOpen && !user.isSignedIn) {
      renderGoogleOAuthButton(handleSignIn);
    }
  }, [ isAuthOpen, user.isSignedIn ]);

  return (
    <>
      <img
        role='button'
        alt='auth'
        onClick={() => setIsAuthOpen(!isAuthOpen)}
        onBlur={() => setIsAuthOpen(false)}
        className={classes.authButton}
        src={user.profileImageUrl || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_258083.png&f=1&nofb=1'} />
      {
        isAuthOpen &&
          <div className={classes.authContainer}>
            {
              user.isSignedIn
                ? <>
                    <AuthProfile {...user} />
                    <div className={classes.authActionContainer}>
                      <button
                        className={classes.signOutButton}
                        onClick={handleSignOut}>
                          Sign out
                      </button>
                    </div>
                </>
                : <AuthGoogleButton />
            }
          </div>
      }
    </>
  );
}

export default Auth;
