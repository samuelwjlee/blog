import React from 'react'
import { createUseStyles } from 'react-jss'

const COMMON_WORD_DEF_STYLE = {
  padding: '20px 10px 20px 30px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

const useStyles = createUseStyles({
  wordContainer: {
    marginTop: 20,
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    height: 200,
  },
  word: {
    ...COMMON_WORD_DEF_STYLE,
    fontSize: 30,
    fontWeight: 'bold',
    background: '#0001'
  },
  definition: {
    ...COMMON_WORD_DEF_STYLE,
    fontSize: 15
  },
})

type WordProps = {
  word: string
  definition: string
}

const Word: React.FC<WordProps> = ({word,definition }) => {
  const classes = useStyles()

  return (
    <div className={classes.wordContainer}>
      <div className={classes.word}>{word}</div>
      <div className={classes.definition}>{definition}</div>
    </div>
  )
}

export default Word
