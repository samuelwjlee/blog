import React from 'react';
import { User } from 'client/types/Auth';

const AuthProfile: React.FC<User> = ({
  isSignedIn,
  profileImageUrl,
  name,
  email
}) => {
  return (
    isSignedIn
      ? <>
          {
           profileImageUrl &&
            <img alt='profile' style={{ width: '50%' }} src={profileImageUrl} />
          }
          Name: { name }
          <br/>
          Email: { email }
        </>
      : null
  )
};

export default AuthProfile;