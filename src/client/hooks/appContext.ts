import React, { useCallback, useEffect, useReducer } from 'react'

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
import { reducer } from 'client/hooks/reducer'
import { store } from 'client/hooks/store'

const initUserState = {
  isSignedIn: false,
  name: null,
  email: null,
  profileImageUrl: null
}

const appContextDefaultVal = {
  user: initUserState,
  claimedWords: [],
  handleSignIn: () => {},
  handleSignOut: () => {},
  claimWord: (wordId: number) => {},
  unClaimWord: (wordId: number) => {}
}

export type AppContextVal = {
  user: User
  claimedWords: Word[]
  handleSignIn: (googleUser: GoogleUser) => void
  handleSignOut: () => void
  claimWord: (wordId: number) => void
  unClaimWord: (wordId: number) => void
}

/**
 * TODO: Add useReducer to further separate state management concerns
 */
export function useAppContextVal(): AppContextVal {
  const [state, dispatch] = useReducer(reducer, store)
  const { user, claimedWords } = state

  const handleSignIn = (googleUser: GoogleUser): void => {
    const callback = (user: User) =>
      dispatch({ type: 'SET_USER', payload: user })
    signInGoogleUser({ user: googleUser, callback })
  }

  const handleSignOut = (): void => {
    const callback = (user: User) =>
      dispatch({ type: 'SET_USER', payload: user })
    signOutGoogleUser({ user: initUserState, callback })
  }

  const ensureUserRegistered = useCallback(async () => {
    const response = await getUser(user.email)

    if (Array.isArray(response) && response.length === 0) {
      createUser(user.email)
    }
  }, [user.email])

  const fetchAndSetClaimedWords = useCallback(async () => {
    const fetchedWords = await getClaimedWords(user.email)
    dispatch({ type: 'SET_CLAIMED_WORDS', payload: fetchedWords })
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
    claimedWords,
    handleSignIn,
    handleSignOut,
    claimWord,
    unClaimWord
  }
}

export const AppContext = React.createContext<AppContextVal>(
  appContextDefaultVal
)
