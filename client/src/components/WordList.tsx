import React, { useContext } from 'react'
import { createUseStyles } from 'react-jss'

import { Word } from 'types/word.types'
import { AppContext } from 'hooks/appContext'
import { BODY_WIDTH_MIN_MAX } from 'constants/style.constants'

const COMMON_WORD_DEF_STYLE = {
  padding: '20px 10px 20px 30px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

const useStyles = createUseStyles({
  wordList: {
    ...BODY_WIDTH_MIN_MAX,
    padding: 10
  },
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
  },
  deleteButton: {
    width: 50,
    alignSelf: 'flex-end',
    marginRight: 20
  }
})

type WordProps = {
  word: string
  func: string
  def: string
  id: number
}
const WordCard: React.FC<WordProps> = ({ word, def, func, id }) => {
  const classes = useStyles()
  const { unClaimWord } = useContext(AppContext)

  return (
    <div className={classes.wordContainer}>
      <div className={classes.word}>
        {word}
        <div className={classes.function}>{func}</div>
      </div>
      <div className={classes.definition}>{def}</div>
      <button className={classes.deleteButton} onClick={() => unClaimWord(id)}>
        delete
      </button>
    </div>
  )
}

type WordListProps = {
  words: Word[]
}
const WordList: React.FC<WordListProps> = ({ words }) => {
  const classes = useStyles()
  return (
    <div className={classes.wordList}>
      {words.map((word, idx) => (
        <WordCard
          id={word.id}
          word={word.name}
          def={word.definition}
          func={word.function}
          key={`${word}-${idx}`}
        />
      ))}
    </div>
  )
}

export default WordList
