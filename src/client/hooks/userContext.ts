import React, { useCallback, useEffect, useState } from 'react'

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
  claimedWords: [],
  fetchUserClaimedWords: () => {},
  claimWord: (wordId: number) => {},
  unClaimWord: (wordId: number) => {}
}

type UserContextVal = {
  user: User
  handleSignIn: (googleUser: GoogleUser) => void
  handleSignOut: () => void
  claimedWords: Word[]
  fetchUserClaimedWords: () => void
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
    const userRes = await fetch(`/users?id=${user.email}`)
      .then(res => res.json())
      .catch(console.log)

    if (userRes && userRes.length === 0) {
      await fetch('/users/new', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ userId: user.email })
      }).catch(console.log)
    }
  }, [user.email])

  const fetchUserClaimedWords = useCallback(async () => {
    const fetchedClaimedWords = await fetch(`/words/user?id=${user.email}`)
      .then(res => res.json())
      .catch(console.log)

    setClaimedWords(fetchedClaimedWords)
  }, [user.email])

  const claimWord = async (wordId: number) => {
    await fetch('/words/claim', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ userId: user.email, wordId })
    })
      .then(res => res.json())
      .catch(console.log)

    // update dom with new words
    await fetchUserClaimedWords()
  }

  const unClaimWord = async (wordId: number) => {
    await fetch('/words/unclaim', {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ userId: user.email, wordId })
    })
      .then(res => res.json())
      .catch(console.log)

    // update dom with new words
    await fetchUserClaimedWords()
  }

  useEffect(() => {
    loadGoogleOAuthScript(handleSignIn)
  }, [])

  useEffect(() => {
    if (user.isSignedIn && user.email) {
      ensureUserRegistered()
      fetchUserClaimedWords()
    }
  }, [user, fetchUserClaimedWords, ensureUserRegistered])

  return {
    user,
    handleSignIn,
    handleSignOut,
    claimedWords,
    fetchUserClaimedWords,
    claimWord,
    unClaimWord
  }
}

export const UserContext = React.createContext<UserContextVal>(
  userContextDefaultVal
)
