import React from 'react'
import { createUseStyles } from 'react-jss'

import Header from 'client/components/Header'
import Dashboard from 'client/components/Dashboard'
import WordList from 'client/components/WordList'
import { mockWordDef } from '__mocks__/word.mocks'
import { BODY_WIDTH_MIN_MAX } from 'client/constants/style.constants'
import { UserContext, userContextDefaultValue } from 'client/hooks/userContext'

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
  content: {
    ...BODY_WIDTH_MIN_MAX,
    margin: 'auto',
    paddingBottom: 80
  }
})

/**
 * TODO:
 * 1. wrap comps with hook+context to provide auth values
 */
const App: React.FC = () => {
  const classes = useStyles()

  return (
    <UserContext.Provider value={userContextDefaultValue}>
      <Header />
      <div className={classes.content}>
        <Dashboard />
        <WordList wordDef={mockWordDef} />
      </div>
    </UserContext.Provider>
  )
}

export default App
