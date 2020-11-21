import React, { useState } from 'react';

type Props = {
  handleSignIn: (res: any) => void
};

const GoogleAuthButton: React.FC<Props> = ({ handleSignIn }) => {
  const [ mounted, setMounted ] = useState<boolean>(false);

  /* Google meta and script tags to be appended before Component mounts */
  if (!mounted){
    const googleAuthMetaTag = document.createElement('meta');
    const googleScriptTag = document.createElement('script');

    googleAuthMetaTag.name = 'google-signin-client_id';
    googleAuthMetaTag.content = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || '';
    googleScriptTag.src = 'https://apis.google.com/js/platform.js';
    googleScriptTag.onload = () => {
      (window as any).gapi.load('auth2', () => {
        renderButton();
      });
    }

    document.head.appendChild(googleAuthMetaTag);
    document.head.appendChild(googleScriptTag);

    setMounted(true);
  }

  const renderButton = () => {
    return (
      (window as any).gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': handleSignIn,
        'onfailure': console.log
      })
    )
  }

  return (
    <div id='my-signin2'></div>
  )
};

export default GoogleAuthButton;
