import React from 'react';

type Props = {
  isSignedIn: boolean,
  handleSignIn: (res: any) => void,
  handleSignOut: () => void
};

const GoogleAuthButton: React.FC<Props> = ({ isSignedIn, handleSignIn, handleSignOut }) => {
  return (
    <div
      className="g-signin2"
      onClick={
        (e: React.MouseEvent) => {
          e && e.preventDefault();

          if (window && (window as any).gapi) {
            const authInstance = (window as any).gapi.auth2.getAuthInstance();

            isSignedIn
              ? authInstance.signOut()
                .then(
                  (res: any) => handleSignOut(),
                  (err: any) => console.log(err)
                )
              : authInstance.signIn()
                .then(
                  (res: any) => handleSignIn(res),
                  (err: any) => console.log(err)
                )
          }
        }
      }/>
  )
};

export default GoogleAuthButton;
