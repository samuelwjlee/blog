import React from 'react'

import { User } from 'client/types/auth.types'

export const userContextDefaultValue = {
  isSignedIn: false,
  name: null,
  email: null,
  profileImageUrl: null
}

export const UserContext = React.createContext<User>(userContextDefaultValue)

// https://wanago.io/2020/09/28/react-context-api-hooks-typescript/
