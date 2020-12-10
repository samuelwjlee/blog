import React, { useEffect, useState } from 'react'

import { GoogleUser, User } from 'client/types/auth.types'
import {
  loadGoogleOAuthScript,
  signInGoogleUser,
  signOutGoogleUser
} from 'client/utils/auth.utils'
import { Word } from 'client/types/word.types'

const initUserState = {
  isSignedIn: false,
  name: null,
  email: null,
  profileImageUrl: null
}

const userContextDefaultVal = {
  user: initUserState,
  handleSignIn: () => {},
  handleSignOut: () => {},
  words: []
}

type UserContextVal = {
  user: User
  handleSignIn: (googleUser: GoogleUser) => void
  handleSignOut: () => void
  words: Word[]
}

export function useUserContextVal(): UserContextVal {
  const [user, setUser] = useState<User>(initUserState)
  const [words, setWords] = useState<Word[]>([])

  const handleSignIn = (googleUser: GoogleUser): void => {
    signInGoogleUser({ user: googleUser, callback: setUser })
  }

  const handleSignOut = (): void => {
    signOutGoogleUser({ user: initUserState, callback: setUser })
  }

  const fetchWords = async () => {
    const fetchedWords = await fetch('/words')
      .then(res => res.json())
      .catch(console.log)

    setWords(fetchedWords)
  }

  const fetchUser = async () => {
    const fetchedUsers = await fetch('/users')
      .then(res => res.json())
      .catch(console.log)

    console.log(fetchedUsers)
  }

  useEffect(() => {
    loadGoogleOAuthScript(handleSignIn)
  }, [])

  useEffect(() => {
    if (user.isSignedIn && user.email) {
      fetchWords()
      fetchUser()
    }
  }, [user])

  return {
    user,
    handleSignIn,
    handleSignOut,
    words
  }
}

export const UserContext = React.createContext<UserContextVal>(
  userContextDefaultVal
)
