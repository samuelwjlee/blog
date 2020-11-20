import React from 'react';
import { User } from 'client/types/Auth';

const AuthProfile: React.FC<User> = ({ isSignedIn, profileImageUrl, name, email  }) => {
  return (
    isSignedIn ?
      <>
        {
          profileImageUrl &&
          <img alt='profile' style={{ width: '50%' }} src={profileImageUrl} />
        }
        {
          name &&
          `Hi there, ${name}!`
        }
        <br/>
        {
          email &&
          `Your Email: ${email}`
        }
      </>
      : null
  )
};

export default AuthProfile;