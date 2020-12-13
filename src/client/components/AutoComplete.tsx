import React, { useCallback, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

import { Word } from 'client/types/word.types'

const useStyles = createUseStyles({
  result: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

const AutoComplete: React.FC = () => {
  const classes = useStyles()
  const [searchedWords, setSearchedWords] = useState<Word[]>([])

  const fetchWordSearched = useCallback(async () => {
    const fetchedWords = await fetch('/words/all')
      .then(res => res.json())
      .catch(console.log)

    setSearchedWords(fetchedWords)
  }, [])

  useEffect(() => {
    fetchWordSearched()
  }, [fetchWordSearched])

  return (
    <>
      {searchedWords.map((word, idx) => (
        <div key={idx} className={classes.result}>
          {word.name}
          <button>Add</button>
        </div>
      ))}
    </>
  )
}

export default AutoComplete
