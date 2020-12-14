import React, { useCallback, useContext, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

import { Word } from 'client/types/word.types'
import { UserContext } from 'client/hooks/userContext'

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
  const { user, fetchUserClaimedWords } = useContext(UserContext)

  const fetchWordSearched = useCallback(async () => {
    const fetchedWords = await fetch('/words/all')
      .then(res => res.json())
      .catch(console.log)

    setSearchedWords(fetchedWords)
  }, [])

  const claimWord = async (wordId: number) => {
    await fetch('/words/claim', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ userId: user.email, wordId })
    })
      .then(res => res.json())
      .catch(console.log)

    await fetchUserClaimedWords()
  }

  useEffect(() => {
    fetchWordSearched()
  }, [fetchWordSearched])

  return (
    <>
      {searchedWords.map((word, idx) => (
        <div key={idx} className={classes.result}>
          {word.name}
          <button onClick={() => claimWord(word.id)}>Add</button>
        </div>
      ))}
    </>
  )
}

export default AutoComplete
