/**
 * Parsed user info from google api
 */
export type User = {
  isSignedIn: boolean;
  name: string | null;
  email: string | null;
  profileImageUrl: string | null;
};

export type GoogleUser = {
  getBasicProfile: () => {
    getName: () => string;
    getEmail: () => string;
    getImageUrl: () => string;
  };
  isSignedIn: () => boolean;
};

export type handleGoogleUserSignIn = (user: GoogleUser) => void;
