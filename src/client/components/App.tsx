import React from 'react'
import { createUseStyles } from 'react-jss'

import Header from 'client/components/Header'
import Dashboard from 'client/components/Dashboard'
import Word from 'client/components/Word'
import { mockWords } from '__mocks__/word.mocks'
import { BODY_WIDTH_MIN_MAX } from 'client/constants/style.constants'

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

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <div className="App">
      <Header />
      <div className={classes.content}>
        <Dashboard />
        {Object.keys(mockWords).map((word, idx) => (
          <Word
            key={`word-${word}-${idx}`}
            word={word}
            definition={mockWords[word]}
          />
        ))}
      </div>
    </div>
  )
}

export default App
