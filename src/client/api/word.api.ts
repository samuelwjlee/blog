export function getClaimedWords(userId: string | null) {
  return fetch(`/words/user?id=${userId}`)
    .then(res => res.json())
    .catch(console.log)
}

export function createClaimedWord(wordId: number, userId: string | null) {
  return fetch('/words/claim', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ userId, wordId })
  })
    .then(res => res.json())
    .catch(console.log)
}

export function deleteClaimedWord(wordId: number, userId: string | null) {
  return fetch('/words/unclaim', {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ userId, wordId })
  })
    .then(res => res.json())
    .catch(console.log)
}
