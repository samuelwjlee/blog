import React, { useEffect, useState } from 'react';

import GoogleAuthButton from 'client/components/GoogleAuthButton';
import AuthProfile from 'client/components/AuthProfile';
import { User } from 'client/store/types/Auth';

const InitialUserState = {
  isSignedIn: false,
  name: null,
  email: null,
  profileImageUrl: null
};

const AuthSection: React.FC = () => {
  const [ user, setUser ] = useState<User>(InitialUserState);

  /* Google meta and script tags required to render Sign in with Google */
  useEffect(() => {
    const googleAuthMetaTag = document.createElement('meta');

    googleAuthMetaTag.name = 'google-signin-client_id';
    googleAuthMetaTag.content = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || '';

    document.head.appendChild(googleAuthMetaTag);
  }, [])

  const handleSignIn = (res: any): void => {
    const profile = res.getBasicProfile();

    setUser({
      isSignedIn: res.isSignedIn(),
      name: profile.getName(),
      email: profile.getEmail(),
      profileImageUrl: profile.getImageUrl(),
    })
  }

  const handleSignOut = () => {
    setUser(InitialUserState);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {
        user.isSignedIn &&
        <AuthProfile
          isSignedIn={user.isSignedIn}
          name={user.name}
          email={user.email}
          profileImageUrl={user.profileImageUrl} />
      }
      <GoogleAuthButton
        isSignedIn={user.isSignedIn}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut} />
    </div>
  );
}

export default AuthSection;
