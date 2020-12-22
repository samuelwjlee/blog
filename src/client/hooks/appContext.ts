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
  state: {
    user: initUserState,
    claimedWords: []
  },
  handleAuth: (user?: GoogleUser) => {},
  claimWord: (wordId: number) => {},
  unClaimWord: (wordId: number) => {}
}

export type AppContextVal = {
  state: {
    user: User
    claimedWords: Word[]
  }
  handleAuth: (user?: GoogleUser) => void
  claimWord: (wordId: number) => void
  unClaimWord: (wordId: number) => void
}

export function useAppContextVal(): AppContextVal {
  const [state, dispatch] = useReducer(reducer, store)
  const { user } = state

  const handleAuth = (user?: GoogleUser): void => {
    const authAction = user ? signInGoogleUser : signOutGoogleUser
    authAction({
      user: user ?? initUserState,
      callback: (user: User) => {
        dispatch({ type: 'SET_USER', payload: user })
      }
    })
  }

  const ensureUserRegistered = useCallback(async () => {
    const response = await getUser(user.email)

    if (Array.isArray(response) && response.length === 0) {
      createUser(user.email)
    }
  }, [user.email])

  const fetchAndSetClaimedWords = useCallback(async () => {
    dispatch({
      type: 'SET_CLAIMED_WORDS',
      payload: await getClaimedWords(user.email)
    })
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
    loadGoogleOAuthScript(handleAuth)
  }, [])

  useEffect(() => {
    if (user.isSignedIn && user.email) {
      ensureUserRegistered()
      fetchAndSetClaimedWords()
    }
  }, [user, fetchAndSetClaimedWords, ensureUserRegistered])

  return {
    state,
    handleAuth,
    claimWord,
    unClaimWord
  }
}

export const AppContext = React.createContext<AppContextVal>(
  appContextDefaultVal
)
