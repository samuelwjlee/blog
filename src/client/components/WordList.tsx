import React from 'react'
import { createUseStyles } from 'react-jss'

import { WordDef } from 'client/types/word.types'

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
    background: '#0001'
  },
  definition: {
    ...COMMON_WORD_DEF_STYLE,
    fontSize: 15
  }
})

type WordProps = {
  word: string
  def: string
}
const Word: React.FC<WordProps> = ({ word, def }) => {
  const classes = useStyles()

  return (
    <div className={classes.wordContainer}>
      <div className={classes.word}>{word}</div>
      <div className={classes.definition}>{def}</div>
    </div>
  )
}

type WordListProps = {
  wordDef: WordDef
}
const WordList: React.FC<WordListProps> = ({ wordDef }) => {
  return (
    <>
      {Object.keys(wordDef).map((word, idx) => (
        <Word word={word} def={wordDef[word]} key={`${word}-${idx}`} />
      ))}
    </>
  )
}

export default WordList
