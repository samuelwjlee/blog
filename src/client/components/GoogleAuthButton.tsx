import React from 'react';

type Props = {
  handleSignIn: (res: any) => void
};

const GoogleAuthButton: React.FC<Props> = ({ handleSignIn }) => {
  return (
    <div
      className="g-signin2"
      onClick={
        (e: React.MouseEvent) => {
          e && e.preventDefault();

          if (window && (window as any).gapi) {
            const authInstance = (window as any).gapi.auth2.getAuthInstance();

            authInstance.signIn()
              .then(
                (res: any) => handleSignIn(res),
                console.log
              )
          }
        }
      }/>
  )
};

export default GoogleAuthButton;
