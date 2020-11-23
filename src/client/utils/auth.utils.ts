import { GOOGLE_OAUTH_BUTTON_ID } from 'client/constants/auth.constants';
import { GoogleUser, handleGoogleUserSignIn } from 'client/types/auth.types';

const renderGoogleOAuthButton = (handleSignIn: handleGoogleUserSignIn): void => (
  (window as any).gapi.signin2.render(GOOGLE_OAUTH_BUTTON_ID, {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': handleSignIn,
    'onfailure': console.log
  })
);

const handleGoogleOAuthOnLoad = (handleSignIn: handleGoogleUserSignIn): void => {
  (window as any).gapi.load('auth2', () => {
    const auth2 = (window as any).gapi.auth2.init({
      client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      scope: 'profile email'
    });

    /* Listen for changes to current user. */
    auth2.isSignedIn.listen((isUserSignedIn: boolean) => {
      isUserSignedIn
        ? handleSignIn(auth2.currentUser.get())
        : renderGoogleOAuthButton(handleSignIn);
    });

    /* Listen for sign-in state changes. */
    auth2.currentUser.listen((user: any) => {
      if (!user.getBasicProfile()) {
        renderGoogleOAuthButton(handleSignIn);
      }
    });
  })
}

export const loadGoogleOAuthScript = (handleSignIn: handleGoogleUserSignIn): void => {
  const googleScriptTag = document.createElement('script');

  googleScriptTag.src = 'https://apis.google.com/js/platform.js';
  googleScriptTag.async = true;
  googleScriptTag.defer = true;
  googleScriptTag.onload = () => handleGoogleOAuthOnLoad(handleSignIn);

  document.body.appendChild(googleScriptTag);
}

export const signOutGoogleUser = (callback: any): void => {
  const googleApi = (window as any).gapi;

  if (googleApi) {
    googleApi.auth2.getAuthInstance().signOut()
      .then(callback)
      .catch(console.log)
  }
};

export const signInGoogleUser = (googleUser: GoogleUser, callback: any): void => {
  const profile = googleUser.getBasicProfile();

  callback({
    isSignedIn: googleUser.isSignedIn(),
    name: profile.getName(),
    email: profile.getEmail(),
    profileImageUrl: profile.getImageUrl(),
  })
};
