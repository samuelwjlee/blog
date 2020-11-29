import React, { useEffect, useState } from 'react'

import { GoogleUser, User } from 'client/types/auth.types'
import {
  loadGoogleOAuthScript,
  signInGoogleUser,
  signOutGoogleUser
} from 'client/utils/auth.utils'

const initUserState = {
  isSignedIn: false,
  name: null,
  email: null,
  profileImageUrl: null
}

const userContextDefaultVal = {
  user: initUserState,
  handleSignIn: () => {},
  handleSignOut: () => {}
}

type UserContextVal = {
  user: User
  handleSignIn: (googleUser: GoogleUser) => void
  handleSignOut: () => void
}

export function useUserContextVal(): UserContextVal {
  const [user, setUser] = useState<User>(initUserState)

  const handleSignIn = (googleUser: GoogleUser): void => {
    signInGoogleUser({ user: googleUser, callback: setUser })
  }

  const handleSignOut = (): void => {
    signOutGoogleUser({ user: initUserState, callback: setUser })
  }

  useEffect(() => {
    loadGoogleOAuthScript(handleSignIn)
  }, [])

  return {
    user,
    handleSignIn,
    handleSignOut
  }
}

export const UserContext = React.createContext<UserContextVal>(
  userContextDefaultVal
)

// https://wanago.io/2020/09/28/react-context-api-hooks-typescript/
