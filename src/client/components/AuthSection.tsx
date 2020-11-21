import React, { useState } from 'react';

import GoogleAuthButton from 'client/components/GoogleAuthButton';
import AuthProfile from 'client/components/AuthProfile';
import { User } from 'client/types/Auth';

const InitialUserState = {
  isSignedIn: false,
  name: null,
  email: null,
  profileImageUrl: null
};

const AuthSection: React.FC = () => {
  /* TODO: move user object to redux store to be globally referenced */
  const [ user, setUser ] = useState<User>(InitialUserState);

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
    if (window && (window as any).gapi) {
      const authInstance = (window as any).gapi.auth2.getAuthInstance();

      authInstance.signOut()
        .then(
          (res: any) => {
            setUser(InitialUserState)
          }
        )
    }
  };

  return (
    <>
      {
        user.isSignedIn &&
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AuthProfile
            isSignedIn={user.isSignedIn}
            name={user.name}
            email={user.email}
            profileImageUrl={user.profileImageUrl} />
            <button onClick={handleSignOut}>Sign out</button>
        </div>
      }
      {
        !user.isSignedIn &&
        <GoogleAuthButton handleSignIn={handleSignIn} />
      }
    </>
  );
}

export default AuthSection;
