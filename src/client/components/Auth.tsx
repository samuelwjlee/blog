import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

import AuthGoogleButton from 'client/components/AuthGoogleButton'
import AuthProfile from 'client/components/AuthProfile'
import { GoogleUser, User } from 'client/types/auth.types'
import {
  loadGoogleOAuthScript,
  renderGoogleOAuthButton,
  signInGoogleUser,
  signOutGoogleUser
} from 'client/utils/auth.utils'
import {
  AUTH_ELE_ZINDEX,
  AUTH_SCREEN_ZINDEX,
  HEADER_HEIGHT
} from 'client/constants/style.constants'
import { GOOGLE_OAUTH_BUTTON_ID } from 'client/constants/auth.constants'
import Avatar from 'client/assets/avatar-icon.png'

const useStyles = createUseStyles({
  authIconButton: {
    borderRadius: '50%',
    height: 45,
    width: 45,
    backgroundImage: (profileImageUrl: string | null) =>
      `url(${profileImageUrl ?? Avatar})`,
    backgroundSize: 'cover',
    zIndex: AUTH_ELE_ZINDEX
  },
  authDropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    right: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid black',
    padding: 30,
    minWidth: 280,
    minHeight: 135,
    [`& #${GOOGLE_OAUTH_BUTTON_ID}`]: {
      margin: 'auto'
    }
  },
  authAction: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10
  },
  signOutButton: {
    width: 100,
    height: 25,
    margin: 5
  },
  screen: {
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    position: 'absolute',
    background: 'transparent',
    zIndex: AUTH_SCREEN_ZINDEX
  }
})

const InitialUserState = {
  isSignedIn: false,
  name: null,
  email: null,
  profileImageUrl: null
}

const Auth: React.FC = () => {
  /* TODO: move user object to redux store to be globally referenced */
  const [user, setUser] = useState<User>(InitialUserState)
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)
  const classes = useStyles(user.profileImageUrl)

  const handleSignIn = (googleUser: GoogleUser): void => {
    signInGoogleUser({ user: googleUser, callback: setUser })
  }

  const handleSignOut = (): void => {
    signOutGoogleUser({ user: InitialUserState, callback: setUser })
  }

  useEffect(() => {
    loadGoogleOAuthScript(handleSignIn)
  }, [])

  /**
   * need to do a fresh google oAuth re-render
   * since google oauth button element re-mounted
   */
  useEffect(() => {
    if (isAuthOpen && !user.isSignedIn) {
      renderGoogleOAuthButton(handleSignIn)
    }
  }, [isAuthOpen, user.isSignedIn])

  return (
    <>
      <div
        role="button"
        onClick={e => {
          e.stopPropagation()
          setIsAuthOpen(!isAuthOpen)
        }}
        className={classes.authIconButton}
      >
        {isAuthOpen && (
          <div className={classes.authDropdown}>
            {user.isSignedIn ? (
              <>
                <AuthProfile {...user} />
                <div className={classes.authAction}>
                  <button
                    className={classes.signOutButton}
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <AuthGoogleButton />
            )}
          </div>
        )}
      </div>
      {isAuthOpen && (
        <div className={classes.screen} onClick={() => setIsAuthOpen(false)} />
      )}
    </>
  )
}

export default Auth
