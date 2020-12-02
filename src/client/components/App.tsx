import React from 'react'
import { createUseStyles } from 'react-jss'

import Header from 'client/components/Header'
// import Dashboard from 'client/components/Dashboard'
import WordList from 'client/components/WordList'
import { mockWords } from '__mocks__/word.mocks'
import { BODY_WIDTH_MIN_MAX } from 'client/constants/style.constants'
import { UserContext, useUserContextVal } from 'client/hooks/userContext'
import WelcomePage from 'client/components/WelcomePage'

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
  const userContextVal = useUserContextVal()
  const classes = useStyles()

  return (
    <UserContext.Provider value={userContextVal}>
      <Header />
      {userContextVal.user.isSignedIn ? (
        <div className={classes.signedInContent}>
          {/* <Dashboard /> */}
          <WordList words={mockWords} />
        </div>
      ) : (
        <WelcomePage />
      )}
    </UserContext.Provider>
  )
}

export default App
