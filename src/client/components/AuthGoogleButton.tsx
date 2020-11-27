import React from 'react'

import { GOOGLE_OAUTH_BUTTON_ID } from 'client/constants/auth.constants'

const AuthGoogleButton: React.FC = () => {
  return <div id={GOOGLE_OAUTH_BUTTON_ID} />
}

export default AuthGoogleButton
