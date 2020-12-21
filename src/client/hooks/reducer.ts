import { User } from 'client/types/auth.types'
import { Word } from 'client/types/word.types'

type State = {
  user: User
  claimedWords: Word[]
}

type Action = {
  type: string
  payload: any
}

export const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_CLAIMED_WORDS':
      return {
        ...state,
        claimedWords: action.payload
      }
    default:
      return {}
  }
}
