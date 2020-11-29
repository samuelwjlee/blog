import React from 'react'
import { createUseStyles } from 'react-jss'

import Header from 'client/components/Header'
import Dashboard from 'client/components/Dashboard'
import WordList from 'client/components/WordList'
import { mockWordDef } from '__mocks__/word.mocks'
import { BODY_WIDTH_MIN_MAX } from 'client/constants/style.constants'
import { UserContext, useUserContextVal } from 'client/hooks/userContext'

const useStyles = createUseStyles({
  '@global': {
    body: {
      fontFamily: 'Open Sans, sans-serif',
      top: 0,
      left: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh'
    },
    '#root': {
      width: '100vw',
      height: '100vh'
    }
  },
  signedInContent: {
    ...BODY_WIDTH_MIN_MAX,
    margin: 'auto',
    paddingBottom: 80
  }
})

const App: React.FC = () => {
  const userContextValue = useUserContextVal()
  const classes = useStyles()

  return (
    <UserContext.Provider value={userContextValue}>
      <Header />
      {userContextValue.user.isSignedIn && (
        <div className={classes.signedInContent}>
          <Dashboard />
          <WordList wordDef={mockWordDef} />
        </div>
      )}
    </UserContext.Provider>
  )
}

export default App
