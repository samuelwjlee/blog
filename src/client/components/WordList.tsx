import React from 'react'
import { createUseStyles } from 'react-jss'

import { Words } from 'client/types/word.types'

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
    height: 180
  },
  word: {
    ...COMMON_WORD_DEF_STYLE,
    fontSize: 30,
    fontWeight: 'bold',
    background: '#0001',
    display: 'flex',
    justifyContent: 'space-between'
  },
  function: {
    fontSize: 15,
    fontWeight: 'normal',
    padding: '0px 20px'
  },
  definition: {
    ...COMMON_WORD_DEF_STYLE,
    fontSize: 15
  }
})

type WordProps = {
  word: string
  func: string
  def: string
}
const Word: React.FC<WordProps> = ({ word, def, func }) => {
  const classes = useStyles()

  return (
    <div className={classes.wordContainer}>
      <div className={classes.word}>
        {word}
        <div className={classes.function}>{func}</div>
      </div>
      <div className={classes.definition}>{def}</div>
    </div>
  )
}

type WordListProps = {
  words: Words
}
const WordList: React.FC<WordListProps> = ({ words }) => {
  return (
    <>
      {Object.keys(words).map((word, idx) => (
        <Word
          word={word}
          def={words[word]?.definition}
          func={words[word]?.function}
          key={`${word}-${idx}`}
        />
      ))}
    </>
  )
}

export default WordList
