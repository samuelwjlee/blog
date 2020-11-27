import React from 'react'
import { createUseStyles } from 'react-jss'

import { BODY_WIDTH_MIN_MAX } from 'client/constants/style.constants'

const useStyles = createUseStyles({
  wordContainer: {
    ...BODY_WIDTH_MIN_MAX,
    marginTop: 20,
    border: '1px solid black',
    display: 'flex',
    height: 200,
  },
  word: {
    padding: '10px 50px',
    fontSize: 30,
    fontWeight: 'bold',
    background: '#0001',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  definition: {
    padding: '10px 30px',
    fontSize: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

type WordProps = {
  word: string
  definition: string
}

const Word: React.FC<WordProps> = ({ word, definition }) => {
  const classes = useStyles()

  return (
    <div className={classes.wordContainer}>
      <div className={classes.word}>{word}</div>
      <div className={classes.definition}>{definition}</div>
    </div>
  )
}

export default Word
