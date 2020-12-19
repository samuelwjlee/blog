import React, { useCallback, useEffect, useState } from 'react'

import { GoogleUser, User } from 'client/types/auth.types'
import {
  loadGoogleOAuthScript,
  signInGoogleUser,
  signOutGoogleUser
} from 'client/utils/auth.utils'
import { Word } from 'client/types/word.types'
import { createUser, getUser } from 'client/api/user.api'
import {
  createClaimedWord,
  deleteClaimedWord,
  getClaimedWords
} from 'client/api/word.api'

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
  claimedWords: [],
  claimWord: (wordId: number) => {},
  unClaimWord: (wordId: number) => {}
}

type UserContextVal = {
  user: User
  handleSignIn: (googleUser: GoogleUser) => void
  handleSignOut: () => void
  claimedWords: Word[]
  claimWord: (wordId: number) => void
  unClaimWord: (wordId: number) => void
}

/**
 * TODO: Add useReducer to further separate state management concerns
 */
export function useUserContextVal(): UserContextVal {
  const [user, setUser] = useState<User>(initUserState)
  const [claimedWords, setClaimedWords] = useState<Word[]>([])

  const handleSignIn = (googleUser: GoogleUser): void => {
    signInGoogleUser({ user: googleUser, callback: setUser })
  }

  const handleSignOut = (): void => {
    signOutGoogleUser({ user: initUserState, callback: setUser })
  }

  const ensureUserRegistered = useCallback(async () => {
    const response = await getUser(user.email)

    if (Array.isArray(response) && response.length === 0) {
      createUser(user.email)
    }
  }, [user.email])

  const fetchAndSetClaimedWords = useCallback(async () => {
    const fetchedWords = await getClaimedWords(user.email)
    setClaimedWords(fetchedWords)
  }, [user.email])

  const claimWord = async (wordId: number) => {
    await createClaimedWord(wordId, user.email)
    await fetchAndSetClaimedWords()
  }

  const unClaimWord = async (wordId: number) => {
    await deleteClaimedWord(wordId, user.email)
    await fetchAndSetClaimedWords()
  }

  useEffect(() => {
    loadGoogleOAuthScript(handleSignIn)
  }, [])

  useEffect(() => {
    if (user.isSignedIn && user.email) {
      ensureUserRegistered()
      fetchAndSetClaimedWords()
    }
  }, [user, fetchAndSetClaimedWords, ensureUserRegistered])

  return {
    user,
    handleSignIn,
    handleSignOut,
    claimedWords,
    claimWord,
    unClaimWord
  }
}

export const UserContext = React.createContext<UserContextVal>(
  userContextDefaultVal
)
