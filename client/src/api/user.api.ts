export function getUser(userId: string | null) {
  return fetch(`/users?id=${userId}`)
    .then(res => res.json())
    .catch(console.log)
}

export function createUser(userId: string | null) {
  return fetch('/users/new', {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ userId })
  }).catch(console.log)
}
