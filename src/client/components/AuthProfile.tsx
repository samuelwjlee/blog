import React from 'react';
import { User } from 'client/store/types/Auth';

const AuthProfile: React.FC<User> = ({ isSignedIn, profileImageUrl, name, email  }) => {
  return (
    isSignedIn ?
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
      </div>
      : null
  )
};

export default AuthProfile;