import React, { useEffect, useState } from 'react';

const GoogleAuthButton: React.FC = () => {
  const [ userInfo, setuserInfo ] = useState({ name: '', email: '', profileImageUrl: '' });

  /* Appened required Google meta and script tags to render auth button on mount */
  useEffect(() => {
    const googleAuthMetaTag = document.createElement('meta');
    const googleScriptTag = document.createElement('script');

    googleAuthMetaTag.name = 'google-signin-client_id';
    googleAuthMetaTag.content = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || '';
    googleScriptTag.src = 'https://apis.google.com/js/platform.js';
    googleScriptTag.async = true;
    googleScriptTag.defer = true;

    document.head.appendChild(googleAuthMetaTag);
    document.body.appendChild(googleScriptTag);
  }, [])

  const signIn = (e: any) => {
    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    if (window && (window as any).gapi) {
      const auth2 = (window as any).gapi.auth2.getAuthInstance()
      // const { onLoginSuccess, onLoginFailure, onRequest } = this.props

      // onRequest();

      auth2.signIn()
        .then(
          (res: any) => {
            const profile = res.getBasicProfile();

            setuserInfo({
              name: profile.getEmail(),
              email: profile.getName(),
              profileImageUrl: profile.getImageUrl(),
            })
          },
          (err: any) => console.log(err)
        );
    }
  }

  const signOut = (e: any) => {
    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    if (
      window && (window as any).gapi &&
      (window as any).gapi.auth2.getAuthInstance().isSignedIn.get()
      ) {
      const auth2 = (window as any).gapi.auth2.getAuthInstance()
      // const { onLoginSuccess, onLoginFailure, onRequest } = this.props

      // onRequest();

      auth2.signOut()
        .then(
          (res: any) => {
            setuserInfo({
              name: '',
              email: '',
              profileImageUrl: ''
            })
          },
          (err: any) => console.log(err)
        );
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {
          userInfo.profileImageUrl &&
          <img style={{ width: '50%' }} src={userInfo.profileImageUrl} />
        }
        {
          userInfo.name &&
          `Hi there, ${userInfo.name}!`
        }
        <br/>
        {
          userInfo.email &&
          `Your Email: ${userInfo.email}`
        }
      </div>
      <div style={{ display: 'flex' }}>
        <div className="g-signin2" onClick={signIn}></div>
        <button onClick={signOut}>Log out</button>
      </div>
    </>
  );
};

export default GoogleAuthButton;
