import React, { useEffect } from 'react';

type Props = {
  handleSignIn: (user: any) => void
};

const GoogleAuthButton: React.FC<Props> = ({ handleSignIn }) => {
  useEffect(() => {
    const renderButton = () => (
      (window as any).gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': handleSignIn,
        'onfailure': console.log
      })
    );

    const handleOAuthOnLoad = () => {
      (window as any).gapi.load('auth2', () => {
        const auth2 = (window as any).gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
          scope: 'profile email'
        });

        /* Listen for changes to current user. */
        auth2.isSignedIn.listen((isUserSignedIn: boolean) => {
          isUserSignedIn
            ? handleSignIn(auth2.currentUser.get())
            : renderButton();
        });

        /* Listen for sign-in state changes. */
        auth2.currentUser.listen((user: any) => {
          if (!user.getBasicProfile()) {
            renderButton();
          }
        });
      })
    }

    const googleScriptTag = document.createElement('script');

    googleScriptTag.src = 'https://apis.google.com/js/platform.js';
    googleScriptTag.async = true;
    googleScriptTag.defer = true;
    googleScriptTag.onload = handleOAuthOnLoad;
    document.body.appendChild(googleScriptTag);
  }, [ handleSignIn ]);

  return (
    <div id='my-signin2' />
  );
};

export default GoogleAuthButton;
