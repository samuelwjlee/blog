import React, { useCallback, useContext, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

import { Word } from 'client/types/word.types'
import { UserContext } from 'client/hooks/userContext'
import { BODY_WIDTH_MIN_MAX } from 'client/constants/style.constants'

const useStyles = createUseStyles({
  result: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  search: {
    ...BODY_WIDTH_MIN_MAX,
    padding: 10
  },
  searchResult: {
    padding: 10
  },
  searchInput: {
    fontSize: 15,
    padding: 10,
    width: '100%',
    height: 40,
    boxSizing: 'border-box'
  }
})

const Search: React.FC = () => {
  const classes = useStyles()
  const [searchedWords, setSearchedWords] = useState<Word[]>([])
  const [claimedWordsHash, setCLaimedWordsHash] = useState<{
    [word: string]: boolean
  }>({})
  const { claimWord, claimedWords } = useContext(UserContext)

  const fetchWordSearched = useCallback(async () => {
    const fetchedWords = await fetch('/words/all')
      .then(res => res.json())
      .catch(console.log)

    setSearchedWords(fetchedWords)
  }, [])

  useEffect(() => {
    fetchWordSearched()
    /**
     * build claimedWordsHash for easier claimed reference
     */
    let hash: { [word: string]: boolean } = {}
    claimedWords.forEach(word => {
      hash[word.name] = true
    })
    setCLaimedWordsHash(hash)
  }, [fetchWordSearched, claimedWords])

  return (
    <div className={classes.search}>
      <input
        className={classes.searchInput}
        type={'text'}
        name={'wordSearchInput'}
        placeholder={'Search word'}
      />
      <div className={classes.searchResult}>
        {searchedWords.map((word, idx) => (
          <div key={idx} className={classes.result}>
            {word.name}
            {claimedWordsHash[word.name] !== undefined ? (
              <div>{'\u2705'}</div> // checkmark
            ) : (
              <button onClick={() => claimWord(word.id)}>Add</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
