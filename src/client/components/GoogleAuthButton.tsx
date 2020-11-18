import React, { useEffect } from 'react';

type GoogleUser = {
  getBasicProfile: () => {
    getId: () => string,
    getName: () => string,
    getImageUrl: () => string,
    getEmail: () => string
  }
}

const onSuccess = (googleUser: GoogleUser) => {
  const profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

const onFailure = (error: any) => console.log(error);

const renderButton = () => {
  console.log('rendering');
  if (window && (window as any).gapi) {
    (window as any).gapi.signin2.render('g-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }
}

const GoogleAuthButton: React.FC = () => {
  /* Appened required Google meta and script tags to render auth button on mount */
  useEffect(() => {
    const googleAuthMetaTag = document.createElement('meta');
    const googleScriptTag = document.createElement('script');

    googleAuthMetaTag.name = 'google-signin-client_id';
    googleAuthMetaTag.content = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || '';
    googleScriptTag.src = `https://apis.google.com/js/platform.js?onload=${renderButton}`;
    googleScriptTag.async = true;
    googleScriptTag.defer = true;

    document.head.appendChild(googleAuthMetaTag);
    document.body.appendChild(googleScriptTag);
  }, [])

  return (
    <div className='g-signin2' />
  );
};

export default GoogleAuthButton;
