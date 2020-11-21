/**
 * Parsed user info from google api
 */
export type User = {
  isSignedIn: boolean,
  name: string | null,
  email: string | null,
  profileImageUrl: string | null
}
