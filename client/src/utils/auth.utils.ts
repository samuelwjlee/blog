import { GOOGLE_OAUTH_BUTTON_ID } from 'constants/auth.constants'
import {
  GoogleUser,
  User,
  handleGoogleUserSignIn
} from 'types/auth.types'

export const renderGoogleOAuthButton = (
  handleSignIn: handleGoogleUserSignIn
): void => {
  if (document.getElementById(GOOGLE_OAUTH_BUTTON_ID)) {
    ;(window as any).gapi.signin2.render(GOOGLE_OAUTH_BUTTON_ID, {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: handleSignIn,
      onfailure: console.log
    })
  }
}

const handleGoogleOAuthOnLoad = (
  handleSignIn: handleGoogleUserSignIn
): void => {
  ;(window as any).gapi.load('auth2', () => {
    const auth2 = (window as any).gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      scope: 'profile email'
    })

    /**
     * Listen for sign-in state changes.
     * e.g.) session expired
     * this is also to presist signed in user
     */
    auth2.isSignedIn.listen((isUserSignedIn: boolean) => {
      isUserSignedIn
        ? handleSignIn(auth2.currentUser.get())
        : renderGoogleOAuthButton(handleSignIn)
    })

    /**
     * Listen for changes to current user.
     * e.g.) user signs out, closes and re-opens browser
     */
    auth2.currentUser.listen((user: GoogleUser) => {
      if (!user.getBasicProfile()) {
        renderGoogleOAuthButton(handleSignIn)
      }
    })
  })
}

export const loadGoogleOAuthScript = (
  handleSignIn: handleGoogleUserSignIn
): void => {
  const googleScriptTag = document.createElement('script')

  googleScriptTag.src = 'https://apis.google.com/js/platform.js'
  googleScriptTag.async = true
  googleScriptTag.defer = true
  googleScriptTag.onload = () => handleGoogleOAuthOnLoad(handleSignIn)

  document.body.appendChild(googleScriptTag)
}

type AuthActionArg = {
  user: User | GoogleUser
  callback: (user: User) => void
}
const isGoogleUser = (user: User | GoogleUser): user is GoogleUser =>
  !!((user as GoogleUser).getBasicProfile && (user as GoogleUser).isSignedIn)
const isAppUser = (user: User | GoogleUser): user is User =>
  !!(
    (user as User).hasOwnProperty('name') &&
    (user as User).hasOwnProperty('email') &&
    (user as User).hasOwnProperty('profileImageUrl')
  )

export const signOutGoogleUser = ({ user, callback }: AuthActionArg): void => {
  const googleApi = (window as any).gapi

  if (googleApi && isAppUser(user)) {
    googleApi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => callback(user))
      .catch(console.log)
  }
}

export const signInGoogleUser = ({ user, callback }: AuthActionArg): void => {
  if (isGoogleUser(user)) {
    const profile = user.getBasicProfile()

    callback({
      isSignedIn: user.isSignedIn(),
      name: profile.getName(),
      email: profile.getEmail(),
      profileImageUrl: profile.getImageUrl()
    })
  }
}
