export function getSearchResult(query: string) {
  return fetch(`/words?query=${query}`)
    .then(res => res.json())
    .catch(console.log)
}
