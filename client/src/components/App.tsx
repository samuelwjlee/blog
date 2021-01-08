import React from 'react'
import { createUseStyles } from 'react-jss'

import Header from 'components/Header'
// import Dashboard from 'client/components/Dashboard'
import WordList from 'components/WordList'
import { BODY_WIDTH_MIN_MAX } from 'constants/style.constants'
import { AppContext, useAppContextVal } from 'hooks/appContext'
import WelcomePage from 'components/WelcomePage'
import Search from 'components/Search'

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
  const appContextVal = useAppContextVal()
  const { user, claimedWords } = appContextVal.state
  const classes = useStyles()

  return (
    <AppContext.Provider value={appContextVal}>
      <Header />
      {user.isSignedIn ? (
        <div className={classes.signedInContent}>
          {/* <Dashboard /> */}
          <Search />
          <WordList words={claimedWords} />
        </div>
      ) : (
        <WelcomePage />
      )}
    </AppContext.Provider>
  )
}

export default App
