import React, { MouseEvent, useContext, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

import AuthGoogleButton from 'client/components/AuthGoogleButton'
import AuthProfile from 'client/components/AuthProfile'
import { renderGoogleOAuthButton } from 'client/utils/auth.utils'
import {
  AUTH_ELE_ZINDEX,
  AUTH_SCREEN_ZINDEX,
  HEADER_HEIGHT
} from 'client/constants/style.constants'
import { GOOGLE_OAUTH_BUTTON_ID } from 'client/constants/auth.constants'
import Avatar from 'client/assets/avatar-icon.png'
import { AppContext } from 'client/hooks/appContext'

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
    top: HEADER_HEIGHT - 15,
    right: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid black',
    padding: 30,
    minWidth: 250,
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

const Auth: React.FC = () => {
  const { user, handleSignIn, handleSignOut } = useContext(AppContext)
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)
  const classes = useStyles(user.profileImageUrl)

  /**
   * button needs to be re-rendered when re-mounted
   */
  useEffect(() => {
    if (isAuthOpen && !user.isSignedIn) {
      renderGoogleOAuthButton(handleSignIn)
    }
  }, [isAuthOpen, user.isSignedIn, handleSignIn])

  /**
   * close authDropdown when change in isSignedIn
   */
  useEffect(() => setIsAuthOpen(false), [user.isSignedIn])

  const handleAuthButtonClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsAuthOpen(!isAuthOpen)
    }
  }

  return user.isSignedIn ? (
    <>
      <div
        role="button"
        onClick={handleAuthButtonClick}
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
        <div className={classes.screen} onClick={handleAuthButtonClick} />
      )}
    </>
  ) : null
}

export default Auth
